export const newsFeed = Array.from({ length: 1000 }).map((_, i) => ({
  id: String(i + 1),
  title: `Titular de la noticia ${i + 1}`,
  content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga quis et ducimus ipsum aliquam assumenda soluta perferendis adipisci. Facilis qui provident in. Quibusdam, corporis dolorum qui laudantium totam aspernatur sint. ${i + 1}.`,
  category: ["Política", "Tecnología", "Deportes", "Cultura"][i % 4],
  author: ["Redacción", "Agencia EFE", "Reuters", "BBC"][i % 4],
  timestamp: new Date(Date.now() - i * 60000).toISOString(),
}));

