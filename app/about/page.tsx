import React from 'react'

const AboutPage = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="text-center">
      <div className="rounded-full overflow-hidden w-64 h-64 mx-auto">
        <img src="/logo.jpg" alt="Circle Image" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-3xl font-bold mt-8">BLUE MOON LIGHT TRAVEL</h1>
      <h3>Công ty du lịch</h3>
    </div>
  </div>
  )
}

export default AboutPage;