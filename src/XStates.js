import React, { useEffect, useState } from 'react'

const XStates = () => {
    const [countryData, setCountryData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")


    const [stateData, setStateData] = useState([])
    const [selectedState, setSelectedState] = useState("")

    const [cityData, setCityData] = useState([])
    const [selectedCity, setSelectedCity] = useState("")


    const fetchCountry = async () => {
        try {
            const response = await fetch(`https://crio-location-selector.onrender.com/countries`);
            const responseData = await response.json();
            if (responseData) {
                setCountryData(responseData);
            }
            else {
                setCountryData([])
            }
        }
        catch (err) {
            console.error(`Error while fetching country`);
        }
    }

    useEffect(() => {
        fetchCountry()
        setSelectedState("")
        setSelectedCity("")
    }, [])

    const fetchState = async (selectCountry) => {
        try {
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectCountry}/states`)
            const responseData = await response.json();
            if (responseData) {
                setStateData(responseData)
            }
        }
        catch (err) {
            console.error("Error while fetching state")
        }
    }

    useEffect(() => {
        if (selectedCountry) {
            fetchState(selectedCountry)
            setSelectedCity("")
        }

    }, [selectedCountry])



    const fetchCity = async (selCountry,selState) => {
        try {
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
            const responseData = await response.json();
            if (responseData) {
                setCityData(responseData)
            }
        }
        catch (err) {
            console.error("Error while fetching city")
        }
    }

    useEffect(() => {
        if (selectedState && selectedCountry) {
            fetchCity(selectedCountry, selectedState)
        }

    }, [selectedState])

    return (
        <div>

            <h1>Select Location</h1>
            <select onChange={(e) => setSelectedCountry(e.target.value)}>
                <option>Select Country</option>
                {countryData.length > 0 && (
                    countryData.map((data) => <option key={data}>{data}</option>)
                )}
            </select>
            <select onChange={(e) => setSelectedState(e.target.value)} 
                disabled={selectedCountry.length==0}>
                <option>Select State</option>
                {stateData.length > 0 && (
                    stateData.map((data) => <option key={data}>{data}</option>)
                )}
            </select>

            <select onChange={(e)=>setSelectedCity(e.target.value)}
                
                disabled={selectedState.length==0}
                >
                <option>Select City</option>
                {
                    cityData.length>0 && (
                        cityData.map((data)=><option key={data}>{data}</option>)
                    )
                }
            </select>

                {selectedCountry && selectedState && selectedCity && 
                
                <h1>You Selected {selectedCity}, {selectedState}, {selectedCountry}</h1>
                }
        </div>
    )
}

export default XStates