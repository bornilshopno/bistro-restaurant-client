import { useState } from "react";
import orderCover from "../../../assets/shop/banner2.jpg"
import Cover from "../../../Components/Shared/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Order = () => {
    const categories=['salad', 'pizza', 'desert', 'soup', 'drinks']
    const {category}=useParams()
    const initialIndex=categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const[menu]=useMenu();
 
    
    const dessert=menu?.filter(item=>item.category==="dessert");
    const soup=menu?.filter(item=>item.category==="soup");
    const drinks=menu?.filter(item=>item.category==="drinks");
    const pizza=menu?.filter(item=>item.category==="pizza");
    const salad=menu?.filter(item=>item.category==="salad");
  

    return (
        <div>
             <Helmet>
                            <title>BistroBoss || Order</title>
                        </Helmet>
            <Cover title={"Order Food"} img={orderCover}>
            </Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                 <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;