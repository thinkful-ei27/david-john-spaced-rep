import React from "react";

export default function Account() {
  return (
    <section className="container mx-auto mt-32">
      <header className="flex flex-col justify-center align-center items-center">
        <p className="text-5xl">Welcome, John!</p>
        <p className="text-xl">See your progress below:</p>
      </header>
      <main className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-8 bg-blue-darkest">
        <div className="category flex flex-row justify-between align-center px-2 py-4 text-white">
          <div>
            <h3>Category 1</h3>
            <p className="pt-2">Progress: x of x</p>
          </div>
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
        </div>
      </main>
      <main className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-8 bg-blue-darkest">
        <div className="category flex flex-row justify-between align-center px-2 py-4 text-white">
          <div>
            <h3>Category 2</h3>
            <p className="pt-2">Progress: x of x</p>
          </div>
          <button
            type="button"
            className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
        </div>
      </main>
    </section>
  );
}
