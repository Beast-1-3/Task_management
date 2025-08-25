import React from 'react'
import MainLayout from '../layouts/MainLayout'

const NotFound = () => {
  const backgroundImage = `url('https://images.unsplash.com/photo-1608889175183-6d8d1c7c2672?auto=format&fit=crop&w=1470&q=80')`;

  return (
    <MainLayout>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-8 transition-all duration-300 text-white"
        style={{ backgroundImage }}
      >
        <div className="bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
          <h1 className="text-7xl font-bold my-8">404</h1>
          <h2 className="text-xl">The page you are looking for doesn't exist</h2>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
