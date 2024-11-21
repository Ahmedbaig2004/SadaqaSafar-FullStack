import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart } from 'lucide-react'
import potato from "../potato.jpg";
import msk from "../msk.jpg";
import Talha from "../Talha.jpg";
import Reyan from "../reyan.jpg";


export default function AboutUs() {
  const founders = [
    { name: "Ahmed Baig", role: "CEO", image: potato, quote: "Empowering communities through compassion" },
    { name: "Shahzeb Khan", role: "CTO", image: msk, quote: "Innovating for a better tomorrow" },
    { name: "Noor ul Talha", role: "CFO", image: Talha, quote: "Ensuring transparency in every donation" },
    { name: "Reyan Imam", role: "COO", image: Reyan, quote: "Optimizing impact, one cause at a time" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-4xl font-bold text-center">About SadaqaSafar</h1>
        <Heart className="h-8 w-8 ml-2 text-emerald-600 dark:text-emerald-400 animate-[pulse_1s_ease-in-out_infinite]" />
      </div>
      
      <section className="mb-16">
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-800 rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-800 dark:text-emerald-200">Our Aim</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            SadaqaSafar aims to bridge the gap between generous donors and verified NGOs, creating a seamless platform for impactful charitable giving. Our mission is to facilitate transparent, efficient, and meaningful donations that make a real difference in people's lives across the globe. We strive to create a world where every act of kindness, no matter how small, can contribute to positive change and uplift communities in need.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-800 rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-800 dark:text-emerald-200">What We Offer</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
            {[
              "Secure and user-friendly donation platform",
              "Rigorous NGO verification process",
              "Transparent donation tracking",
              "Diverse range of causes to support",
              "Easy-to-use campaign management tools for NGOs",
              "Regular project updates and impact reports",
              "Customizable donation options",
              "Mobile app for on-the-go giving",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 text-emerald-600 dark:text-emerald-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Founding Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder) => (
            <Card key={founder.name} className="overflow-hidden">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-emerald-200 dark:border-emerald-800">
                  <AvatarImage src={founder.image} alt={founder.name} />
                  <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{founder.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Badge variant="secondary" className="mb-2">{founder.role}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{founder.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-800 rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-emerald-800 dark:text-emerald-200">Join Our Mission</h2>
          <div className="text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Together, we can make a lasting difference. Join SadaqaSafar in our mission to create positive change and support communities in need around the world.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Get Involved Today
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}