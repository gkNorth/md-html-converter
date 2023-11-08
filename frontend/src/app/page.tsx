import Form from '@/components/Form';

export default function Home() {
  return (
    <main className="bg-gray-50">
      <div className="max-w-3xl m-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white py-4">
          HTML ↔ Markdown Converter
        </h1>
        <div className="container mx-auto p-8">
          <Form />
        </div>
      </div>
    </main>
  );
}
