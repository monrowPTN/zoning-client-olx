import supabase from './supabaseClient';
import React, { useState, useEffect } from 'react';
import './custom.css';
import MapPreview from './MapPreview';

const LeadForm = ({ onLogout }) => {
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [driverID, setDriverID] = useState('');

  useEffect(() => {
    const storedID = localStorage.getItem('driverID');
    console.log("📦 Loaded driverID from localStorage:", storedID);
    if (storedID) {
      setDriverID(storedID);
    }
  }, []);

  const handlePinLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);
        setError('');
        setLoadingLocation(false);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          if (data?.display_name) {
            setAddress(data.display_name);
          }
        } catch (error) {
          console.error('❌ Reverse geocoding failed:', error);
        }
      },
      (err) => {
        setError('Unable to retrieve your location.');
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧾 DriverID at submit:", driverID);

    try {
      const { data, error } = await supabase.from('leads').insert([
        {
          shop_name: shopName,
          phone: phone,
          address: address,
          zone: zone,
          latitude: latitude || null,
          longitude: longitude || null,
          driver_id: driverID || null,
        },
      ]);

      if (error) {
        console.error('❌ Supabase error:', error.message);
        setError('❌ Failed to submit lead. Please try again.');
        return;
      }

      console.log('✅ Lead submitted:', data);
      setSuccessMessage('Lead Submitted Successfully ✅');

      setTimeout(() => {
        setSuccessMessage('');
        setShopName('');
        setPhone('');
        setAddress('');
        setZone('');
        setLatitude('');
        setLongitude('');
      }, 3000);
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setError('❌ Something went wrong.');
    }
  };

  return (
    <div className="lead-form-wrapper">
      <h2>Lead Submission Form</h2>
      <form onSubmit={handleSubmit} className="lead-form">
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          required
        />
        <button type="button" onClick={handlePinLocation}>
          📍 Pin Location
        </button>
        <button type="submit">Submit Lead</button>
      </form>

      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default LeadForm;