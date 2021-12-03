import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Container,
  Button
} from '@mui/material';

import LoaderComponent from '@/components/Loader';
import CardComponent from '@/components/Card';

import api from '@/services/api';
import {addNewProduct} from '@/store/modules/cart/actions'

import {IProduct} from '@/types'

const Home: React.FC = () => {
  const dispatch = useDispatch()

  const [list, setList] = useState<IProduct[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect( () => {
    setIsLoad(true)
    api.get('products').then(
      res => setList(res.data)
    )
    .catch( e => console.error(e) )
    .finally( () => {
      setTimeout( () => {
        setIsLoad(false)
      }, 2500)
    })
  }, [])

  const handleAddCart = (item: IProduct) => {
    dispatch(addNewProduct(item))
  }

  if(isLoad){
    return <LoaderComponent show={isLoad} />
  }

  return(
    <Container>
      <Grid 
        container
        columns={{xs: 6, md: 12}}
        spacing={2}
        style={{ paddingTop: 40, paddingBottom: 40 }}
        justifyContent="center"
        alignItems="center"
      >
          { list?.map( item => (
            <CardComponent
              keyValue={item.id}
              textTitle={item.name}
              img={item.image}
              altText={item.name}
              descriptionText={item.description}
              priceText={item.price}
              handleAction={handleAddCart}
              itemDefault={item}
            />
          )) }
      </Grid>
    </Container>
  )
}

export default Home;