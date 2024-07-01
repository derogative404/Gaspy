// pages/index.tsx
'use client';
import { useState } from 'react'

interface FuelPricesResponse {
  success: boolean
  prices?: any
  message?: string
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [latitude, setLatitude] = useState('-36.8485')
  const [longitude, setLongitude] = useState('174.7633')
  const [distance, setDistance] = useState('10')
  const [message, setMessage] = useState('')
  const [prices, setPrices] = useState<any | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    setPrices(null)
    try {
      const response = await fetch('http://localhost:5000/api/fuel-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, latitude, longitude, distance }),
      })
      const data: FuelPricesResponse = await response.json()
      if (data.success) {
        setPrices(data.prices)
        setMessage('Fuel prices retrieved successfully')
      } else {
        setMessage(data.message || 'An error occurred')
      }
    } catch (error) {
      setMessage('An error occurred')
    }
  }

  return (
    <div>
      <h1>Gaspy Fuel Prices</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
        <input
          type="text"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Search radius (km)"
        />
        <button type="submit">Get Fuel Prices</button>
      </form>
      {message && <p>{message}</p>}
      {prices && (
        <div>
          <h2>Fuel Prices:</h2>
          <pre>{JSON.stringify(prices, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}