import { API } from "@/app/api";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopPageModel } from "@/interfaces/page.interface";

export async function getPage(alias: string): Promise<TopPageModel | null> {
  const response = await fetch(API.topPage.byAlias + alias, {
    method: "GET",
    headers: new Headers({ 'content-type': 'application/json' }),
    next: { revalidate: 10 }
  })
  if (!response.ok) {
    return null;
  }
  return response.json();
}