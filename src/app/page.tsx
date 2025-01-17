import TodoForm from '@/components/todo/TodoForm';
import TodoList from '@/components/todo/TodoList';

export default function Page() {
    return (
        <main className="min-h-[100dvh] bg-gray-100 ">
            <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
                {/* 헤더 */}
                <header className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-center text-blue-600">
                        To-Do App
                    </h1>
                    <p className="text-gray-600 text-center">
                        Manage your tasks efficiently and stay productive!
                    </p>
                </header>
                <section className="my-8">
                    <TodoForm />
                </section>
                <section>
                    <TodoList />
                </section>
            </div>
        </main>
    );
}
