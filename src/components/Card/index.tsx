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

import {ICardComponent} from '@/types'
const CardComponent: React.FC<ICardComponent> = ({ keyValue, textTitle, img, altText, descriptionText, priceText, handleAction, itemDefault }) => {
  
  return (
      <Grid item xs>
      <Card sx={{ maxWidth: 345}} key={keyValue}>
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
          <h3>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL"}).format(priceText)}</h3>
        </CardContent>
        <CardActions>
          <Button 
            onClick={ () => handleAction(itemDefault) }
            color="primary"
            variant="contained"
          >
            Adicionar ao carrinho
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardComponent;