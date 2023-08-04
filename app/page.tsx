import Content from "@/components/Content";
import Title from "@/components/Title";

export default function Home() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-custom">
            <main className="flex max-w-[600px] flex-col items-center gap-y-20">
                <Title />
                <Content />
            </main>
        </div>
    );
}
