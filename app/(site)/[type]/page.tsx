import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { firstLevelMenu } from "@/helpers/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Страница курсов",
    description: "Generated by create next app",
};

export async function generateStaticParams() {
    return firstLevelMenu.map(m => m.route);
}

export default async function Cource({ params }: { params: { type: string } }) {
    if (!firstLevelMenu.map(m => m.route).includes(params.type)) {
        notFound();
    }
    return (
        <div>
            Страница c {params.type}
        </div>
    );
}