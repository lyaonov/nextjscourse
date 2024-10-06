import { Button, Htag, Input, P, Rating, Tag, TextArea } from "@/components";
import { getMenu } from "@/api/menu";
import Menu from "./components/menu";
import axios from "axios";

export async function generateStaticParams() {
  const menu = await getMenu(0);
  return menu.flatMap((item) => item.pages.map((page) => ({ alias: page.alias })))
}

export default async function Home() {
  const menu = await getMenu(0)
  return (
    <div>
      {/* <Menu /> */}
      <ul>{menu.map((m) => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}</ul>
      <Htag tag='h1'> Text </Htag>
      <Button appearance="ghost" arrow="right">Кнопка</Button>
      <P size="l">Большой</P>
      <P>Средний</P>
      <P size="s">Мелкий</P>
      <Tag size="s">ghost</Tag>
      <Tag size="m" color="red">red</Tag>
      <Tag size="m" color="green">gredn</Tag>
      <Tag color="primary">primary</Tag>
      <Rating isEditable rating={2} />
      <Input placeholder="test" />
      <TextArea placeholder="test" />

    </div>
  );
}
