use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use askama::Template;
use tower_http::services::ServeDir;
use serde::{Deserialize, Serialize};
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};


#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "ctfbox=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();


    info!("initializing router...");

    let api_router = Router::new().route("/login", get(login_server));
    let assets_path = std::env::current_dir().unwrap();

    let app = Router::new()
        .nest("/api", api_router)
        .route("/", get(index))
        .route("/login", get(login))
        .nest_service(
            "/assets",
            ServeDir::new(format!("{}/assets", assets_path.to_str().unwrap()))
        );
    
    info!("Server running on port 3000!");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Template)]
#[template(path = "auth/login.html")]
struct LoginTemplate {
    error_message: Option<String>,
    username: Option<String>,
}

#[derive(Template)]
#[template(path = "index.html")]
struct IndexTemplate {
    username: String,
}

async fn login() -> impl IntoResponse {
    LoginTemplate {
        error_message: None,
        username: None,
    }
}

async fn index() -> impl IntoResponse {
    IndexTemplate {
        username: "dev".to_string(),
    }
}

async fn login_server() -> &'static str {
    "Hello!"
}