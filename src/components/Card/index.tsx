import React from 'react';

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Button
} from '@mui/material';

import {getDiscountPrice} from '@/utils'

import {ICardComponent} from '@/types';
const CardComponent: React.FC<ICardComponent> = ({ textTitle, img, altText, descriptionText, priceText, discountText, handleAction, itemDefault, handleDetails }) => {
  
  return (
      <Grid item xs>
        <Card sx={{ maxWidth: 345}}>
          <CardHeader
            title={textTitle}
          />
          <CardMedia
            component="img"
            height="200px"
            width="200px"
            image={img}
            alt={altText} 
          />
          <CardContent>
            <p>{descriptionText}</p>
            <h3> {getDiscountPrice(discountText, priceText)}</h3>
          </CardContent>
          <CardActions style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button 
              onClick={ () => handleDetails(itemDefault.id) }
              color="secondary"
              variant="contained"
            >
              Ver detalhes
            </Button>
            <Button 
              onClick={ () => handleAction(itemDefault) }
              color="primary"
              variant="contained"
              fullWidth
            >
              Adicionar ao carrinho
            </Button>
          </CardActions>
        </Card>
    </Grid>
  );
}

export default CardComponent;