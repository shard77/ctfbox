use axum::{
    extract::Form,
    response::{Html, IntoResponse},
    routing::{get, post},
    Router,
};
use askama::Template;
use serde::Deserialize;
use tower_http::services::ServeDir;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use validators::prelude::*;

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();

    let api_router = Router::new()
        .route("/login", post(login_server))
        .route("/register", post(register_server));

    let assets_path = std::env::current_dir().unwrap();

    let app = Router::new()
        .nest("/api", api_router)
        .route("/", get(index))
        .route("/login", get(login))
        .route("/register", get(register))
        .nest_service(
            "/assets",
            ServeDir::new(format!("{}/assets", assets_path.to_str().unwrap()))
        );

    info!("Starting server on port 3000");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Template)]
#[template(path = "pages/auth/login.html", print = "all")]
struct LoginTemplate {
    error_message: Option<String>,
    username: Option<String>,
}

#[derive(Template)]
#[template(path = "pages/auth/register.html")]
struct RegisterTemplate {
    error_message: Option<String>,
    username: Option<String>,
}

#[derive(Template)]
#[template(path = "pages/index.html")]
struct IndexTemplate {
    username: String,
}

#[derive(Debug, Deserialize)]
struct LoginForm {
    username: String,
    password: String,
}

#[derive(Debug, Deserialize)]
struct RegisterForm {
    username: String,
    email: String,
    password: String,
    password_confirm: String,
}

async fn index() -> impl IntoResponse {
    IndexTemplate {
        username: "dev".to_string(),
    }
}

async fn login() -> impl IntoResponse {
    LoginTemplate {
        error_message: None,
        username: None,
    }
}

async fn register() -> impl IntoResponse {
    RegisterTemplate {
        error_message: None,
        username: None,
    }
}

async fn login_server(Form(login_data): Form<LoginForm>) -> impl IntoResponse {
    info!("Received login: {:?}", login_data);

    let input_username = login_data.username.trim();
    let input_password = login_data.password.trim();

    let error_message = if input_username.is_empty() {
        "Username is empty"
    } else if input_password.is_empty() {
        "Password is empty"
    } else {

        return LoginTemplate {
            error_message: None,
            username: Some(login_data.username),
        }.into_response();
    };

    LoginTemplate {
        error_message: Some(error_message.to_string()),
        username: Some(login_data.username),
    }.into_response()
}

async fn register_server(Form(register_data): Form<RegisterForm>) -> impl IntoResponse {
    // Process registration data here
    Html(format!("Received registration: {:?}", register_data))
}
