import { Divider } from "@nextui-org/react";

export default function DividerComponent() {
    return (
        <div className="max-w-md">
            <Divider className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-small">
                <div>Blog</div>
                <Divider orientation="vertical" />
                <div>Docs</div>
                <Divider orientation="vertical" />
                <div>Source</div>
            </div>
        </div>
    );
}
