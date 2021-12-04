import React, {useState, SyntheticEvent} from 'react';
import {useSelector} from 'react-redux';

import {
  Button,
  SwipeableDrawer,
  Badge,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Stack,
  Chip,
  Box,
  Container,
  IconButton
} from '@mui/material';

import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined
} from '@mui/icons-material';

import {getDiscountPrice} from '@/utils'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { ICartState } from '@/store/modules/cart/types';

const Cart: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleCart = (event: SyntheticEvent) => {
    setIsOpen(!isOpen)
  }
  const state = useSelector( (state: ICartState) => state.cart)
  return(
    <>
      <Button onClick={handleCart}>
        <Badge badgeContent={state.length}>
        <ShoppingBagIcon />
        </Badge>
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={handleCart}
        onOpen={handleCart}
      >
        <div className="cart-content">
          <Container>
            {state.length === 0 ? (
              <div className="cart-empty">
                <div>
                  <h1>Ooops</h1>
                  <h6>Seu carrinho está vazio.</h6>
                </div>
              </div>
            ) : (
              <>
                {state?.map( (item, index) => (
                <Card 
                  key={index}
                  sx={{
                    marginTop: 2,
                    marginBottom: 2
                  }}
                >
                  <CardContent sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    alignItems: 'center' 
                  }}>
                    <Box sx={{ width: 200}}>
                    <Typography sx={{ fontWeight: 'bold' }} >
                      {item.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      sx={{ width: 151}}
                      image={item.image}
                      alt={item.name}
                    />
                  </Box>
                  <Box>
                    <Stack spacing={1} sx={{ display: 'flex'}}>
                      <>
                      {item?.category.map( item => (
                      <Chip 
                        label={item}
                        size="small"
                        variant="outlined"  
                        />
                      ))}
                      </>
                    </Stack>
                    <Typography sx={{ fontWeight: 'bold' }}>{getDiscountPrice(item.discount, item.price)}</Typography>
                    <Box>
                      <IconButton>
                        <RemoveCircleOutlineOutlined />
                      </IconButton>
                      <IconButton>
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </Box>
                  </Box>
                  </CardContent>
                </Card>
                ))}
                <Button 
                  color="error"
                  variant="contained"
                  className="checkout-button"
                >
                  Finalizar
                </Button>
              </>
              )}
          </Container>
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default Cart;