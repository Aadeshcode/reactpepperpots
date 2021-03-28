import React from 'react'
import BestSellers from '../components/BestSellers'
import Featured from '../components/Featured'
import LowerBody from '../components/LowerBody'
import NewAndFeatured from '../components/NewAndFeatured'
import ResourcesComponent from '../components/ResourcesComponent'
import CorporateGiftingComponent from '../components/CorporateGiftingComponent'



const HomeScreen = () => {
    return (
        <div >
        
            <Featured />
            <BestSellers />
            <NewAndFeatured />
            <LowerBody />
            <ResourcesComponent />
            <CorporateGiftingComponent />
        </div>
    )
}

export default HomeScreen
