import supabase from './supabaseClient';
import React, { useState } from 'react';
import './custom.css';

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
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError('');
        setLoadingLocation(false);
      },
      (err) => {
        setError('Unable to retrieve your location.');
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from('leads').insert([
        {
          shop_name: shopName,
          phone: phone,
          address: address,
          zone: zone,
          latitude: latitude,
          longitude: longitude,
          driver_id: localStorage.getItem('driverID'),
        },
      ]);

      if (error) {
        console.error('❌ Supabase error:', error.message);
        setError('❌ Failed to submit lead. Please try again.');
        return;
      }

      console.log('✅ Lead submitted:', data);
      setSuccessMessage('Lead Submitted Successfully ✅');

      // Clear form after 3s
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
    <div className="page-layout">
      {/* Left Side (Form) */}
      <div className="left-side">
        <div className="card">
          <img src="/olx-logo.png" alt="OLX Logo" className="logo" />
          <h1 className="title">New Zoning Lead</h1>
  
          <button
            onClick={() => {
              localStorage.removeItem('loggedIn');
              if (onLogout) onLogout();
            }}
            className="btn"
            style={{ marginBottom: '20px', background: '#ff4d4f' }}
          >
            Logout
          </button>
  
          {/* keep rest of form fields here as-is */}

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="🏪 Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="input shop-name-input"  // <-- extra class here
              required
            />
            <input
              type="tel"
              placeholder="📞 Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="📍 Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              required
            />
            <select className="input" value={zone} onChange={(e) => setZone(e.target.value)} required>
              <option value="">Select Zone</option>

              {/* ✅ Beirut */}
              <optgroup label="Beirut">
                <option value="Achrafieh">Achrafieh</option>
                <option value="Ain El Mreisseh">Ain El Mreisseh</option>
                <option value="Badaro">Badaro</option>
                <option value="Barbir">Barbir</option>
                <option value="Basta">Basta</option>
                <option value="Basta Al Tahta">Basta Al Tahta</option>
                <option value="Bachoura">Bachoura</option>
                <option value="Bourj Abu Haidar">Bourj Abu Haidar</option>
                <option value="Corniche El Mazraa">Corniche El Mazraa</option>
                <option value="Downtown Beirut">Downtown Beirut</option>
                <option value="Gemmayze">Gemmayze</option>
                <option value="Hamra">Hamra</option>
                <option value="Karantina">Karantina</option>
                <option value="Kaskas">Kaskas</option>
                <option value="Manara">Manara</option>
                <option value="Mar Mikhael">Mar Mikhael</option>
                <option value="Mazraa">Mazraa</option>
                <option value="Minet El Hosn">Minet El Hosn</option>
                <option value="Ras Beirut">Ras Beirut</option>
                <option value="Sodeco">Sodeco</option>
                <option value="Spears">Spears</option>
                <option value="Tallet El Khayat">Tallet El Khayat</option>
                <option value="Verdun">Verdun</option>
                <option value="Wata El Msaytbeh">Wata El Msaytbeh</option>
                <option value="Zokak El Blatt">Zokak El Blatt</option>
              </optgroup>

              {/* ✅ Mount Lebanon */}
              <optgroup label="Mount Lebanon">
                <option value="Ain Anoub">Ain Anoub</option>
                <option value="Aintoura">Aintoura</option>
                <option value="Aley">Aley</option>
                <option value="Antelias">Antelias</option>
                <option value="Aramoun">Aramoun</option>
                <option value="Baabda">Baabda</option>
                <option value="Ballouneh">Ballouneh</option>
                <option value="Barouk">Barouk</option>
                <option value="Bchamoun">Bchamoun</option>
                <option value="Beit Mery">Beit Mery</option>
                <option value="Bhamdoun">Bhamdoun</option>
                <option value="Bikfaya">Bikfaya</option>
                <option value="Bsaba">Bsaba</option>
                <option value="Broummana">Broummana</option>
                <option value="Bsalim">Bsalim</option>
                <option value="Choueifat">Choueifat</option>
                <option value="Damour">Damour</option>
                <option value="Dbayeh">Dbayeh</option>
                <option value="Dekwaneh">Dekwaneh</option>
                <option value="Deir El Qamar">Deir El Qamar</option>
                <option value="Dora">Dora</option>
                <option value="Faraya">Faraya</option>
                <option value="Fanar">Fanar</option>
                <option value="Ghosta">Ghosta</option>
                <option value="Hadath">Hadath</option>
                <option value="Harissa">Harissa</option>
                <option value="Hazmieh">Hazmieh</option>
                <option value="Jal El Dib">Jal El Dib</option>
                <option value="Jeita">Jeita</option>
                <option value="Jdeideh">Jdeideh</option>
                <option value="Jounieh">Jounieh</option>
                <option value="Kahale">Kahale</option>
                <option value="Kfarchima">Kfarchima</option>
                <option value="Kfardebian">Kfardebian</option>
                <option value="Khalde">Khalde</option>
                <option value="Mansourieh">Mansourieh</option>
                <option value="Mazraat Yachouh">Mazraat Yachouh</option>
                <option value="Mtein">Mtein</option>
                <option value="Mtayleb">Mtayleb</option>
                <option value="Rabieh">Rabieh</option>
                <option value="Rayfoun">Rayfoun</option>
                <option value="Saoufar">Saoufar</option>
                <option value="Sarba">Sarba</option>
                <option value="Sin El Fil">Sin El Fil</option>
                <option value="Souk El Gharb">Souk El Gharb</option>
                <option value="Zalka">Zalka</option>
                <option value="Zouk Mikael">Zouk Mikael</option>
                <option value="Zouk Mosbeh">Zouk Mosbeh</option>
              </optgroup>

              {/* ✅ North Lebanon */}
              <optgroup label="North Lebanon">
                <option value="Akkar">Akkar</option>
                <option value="Amioun">Amioun</option>
                <option value="Anfeh">Anfeh</option>
                <option value="Batroun">Batroun</option>
                <option value="Bcharre">Bcharre</option>
                <option value="Chekka">Chekka</option>
                <option value="Ehden">Ehden</option>
                <option value="Halba">Halba</option>
                <option value="Koura">Koura</option>
                <option value="Miniyeh">Miniyeh</option>
                <option value="Mina">Mina</option>
                <option value="Sir El Dinnieh">Sir El Dinnieh</option>
                <option value="Tripoli">Tripoli</option>
                <option value="Zgharta">Zgharta</option>
              </optgroup>

              {/* ✅ South Lebanon */}
              <optgroup label="South Lebanon">
                <option value="Bint Jbeil">Bint Jbeil</option>
                <option value="Jezzine">Jezzine</option>
                <option value="Marjayoun">Marjayoun</option>
                <option value="Nabatieh">Nabatieh</option>
                <option value="Qana">Qana</option>
                <option value="Saida">Saida (Sidon)</option>
                <option value="Sour">Sour (Tyre)</option>
              </optgroup>

              {/* ✅ Bekaa */}
              <optgroup label="Bekaa">
                <option value="Anjar">Anjar</option>
                <option value="Baalbek">Baalbek</option>
                <option value="Chtaura">Chtaura</option>
                <option value="Hermel">Hermel</option>
                <option value="Jdeideh Ferzol">Jdeideh Ferzol</option>
                <option value="Rachaya">Rachaya</option>
                <option value="Taanayel">Taanayel</option>
                <option value="Zahle">Zahle</option>
              </optgroup>
            </select>

            <button
              type="button"
              onClick={handlePinLocation}
              className="btn"
              disabled={loadingLocation}
            >
              {loadingLocation ? '📍 Pinning...' : '📍 Pin My Location'}
            </button>

            {latitude && longitude && (
              <div style={{ marginTop: '10px', color: '#006241', fontWeight: 'bold' }}>
                📍 Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </div>
            )}

            <button type="submit" className="btn">
              Submit Lead
            </button>

            {successMessage && (
              <div style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Side (Map + Pins) */}
      <div className="right-side">
        <div className="map-wrapper">
          <img src="/lebanon-map.png" alt="Lebanon Map" className="map-image" />
          {/* Pins (absolute positioned) */}
          <div className="pin" style={{ top: '13.5%', left: '50%' }}>Tripoli 📍</div>
          <div className="pin" style={{ top: '12%', left: '81%' }}>Akkar 📍</div>
          <div className="pin" style={{ top: '50%', left: '21%' }}>Kesserwan 📍</div>
          <div className="pin" style={{ top: '48%', left: '75%' }}>Beqaa 📍</div>
          <div className="pin" style={{ top: '82%', left: '8.78%' }}>Tyre 📍</div>
          <div className="pin" style={{ top: '60%', left: '54%' }}>Sidon 📍</div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;