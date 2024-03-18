import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../../features/articleSlice";
import AfficheAerticleTable from './AfficheArticleTable';
import Createarticle from './CreateArticle';


const ProductsAppAdmin = () => {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticles());
},[])

return (
<div>
<Createarticle/>
<AfficheAerticleTable />
</div>
)
}
export default ProductsAppAdmin