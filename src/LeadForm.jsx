import supabase from './supabaseClient';
import React, { useState } from 'react';
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
    
    const driverID = localStorage.getItem('driverID'); // ✅ GET IT HERE
  
    try {
      const { data, error } = await supabase.from('leads').insert([
        {
          shop_name: shopName,
          phone: phone,
          address: address,
          zone: zone,
          latitude: latitude,
          longitude: longitude,
          driver_id: driverID, // ✅ PASS IT HERE
        },
      ]);
  
      if (error) {
        console.error('❌ Supabase error:', error.message);
        setError('❌ Failed to submit lead. Please try again.');
        return;
      }
  
      console.log('✅ Lead submitted:', data);
      setSuccessMessage('Lead Submitted Successfully ✅');
  
      // Clear form
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
    // unchanged JSX from the user (omitted for brevity in this part)
    // everything from return (...) remains as-is
  );
};

export default LeadForm;
