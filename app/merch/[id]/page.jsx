export default function ProductDetail({ params }) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <h1 className="text-3xl mb-10 tracking-widest uppercase">
        {id} T-Shirt
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <img src={`/images/${id}-front.png`} />
        <img src={`/images/${id}-side.png`} />
        <img src={`/images/${id}-back.png`} />
      </div>
    </div>
  );
}
