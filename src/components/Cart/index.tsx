import React, {useState, SyntheticEvent, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

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
  IconButton,
  CircularProgress
} from '@mui/material';

import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined
} from '@mui/icons-material';

import {getDiscountPrice, convertToCurrency} from '@/utils'

import {
  incrementItem, 
  decrementItem
} from '@/store/modules/cart/actions'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { ICartState } from '@/store/modules/cart/types';

import {IProduct} from '@/types'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLoad, setIsLoad ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);

  const handleCart = (event: SyntheticEvent) => {
    setIsOpen(!isOpen)
  }

  const handleDecrement = (item: IProduct) => {
    setIsLoad(true)
    setTimeout(() => {
      setIsLoad(false)
    }, 1000)
    dispatch(decrementItem(item))
  }

  const handleIncrement = (item: IProduct) => {
    setIsLoad(true)
    setTimeout(() => {
      setIsLoad(false)
    }, 1000)
    dispatch(incrementItem(item))

  }
  
  const state = useSelector( (state: ICartState) => state.cart)
  
  useEffect(() => {
    state.reduce(function(previous: any, current: IProduct) {
      return setTotalPrice(previous + current.price)
    }, 0)
  }, [state])
  
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
                <div 
                  className="item-cart-element" 
                  key={index}
                >
                  <>
                    <Card>
                        <CardContent sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-around', 
                          alignItems: 'center' 
                        }}>
                          <Box sx={{ width: 200}}>
                            <>
                            {isLoad && (
                              <div className="progress">
                                <CircularProgress />
                              </div>
                            )}
                            </>
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
                            {item?.category.map( (item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              size="small"
                              variant="outlined"  
                              />
                            ))}
                            </>
                          </Stack>
                          <Typography sx={{ fontWeight: 'bold' }}>{getDiscountPrice(item.discount, item.price)}</Typography>
                          <Box>
                            <IconButton
                            onClick={() => handleDecrement(item)}
                            >
                              <RemoveCircleOutlineOutlined />
                            </IconButton>
                            {item.qtd}
                            <IconButton
                              onClick={ () => handleIncrement(item)}
                            >
                              <AddCircleOutlineOutlined />
                            </IconButton>
                          </Box>
                        </Box>
                        </CardContent>
                    </Card>
                  </>
                </div>
                ))}
                <Box
                  className="checkout-subtotal"
                >
                  <Box
                    component="div" 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <Typography align="left">
                      Total:
                    </Typography>
                    <Typography align="right" sx={{ fontWeight: "bold" }}>
                      {convertToCurrency(totalPrice)}
                    </Typography>
                  </Box>
                  <Box
                    component="div" 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <Typography align="left">
                      { state.length > 1 ? 'Seus jogos' : 'Seu jogo'}
                    </Typography>
                    <Typography align="right" sx={{ fontWeight: "bold" }}>
                      {state.length}
                    </Typography>
                  </Box>
                  <Button 
                    color="error"
                    variant="contained"
                    fullWidth
                  >
                    Finalizar
                  </Button>
                </Box>
              </>
              )}
          </Container>
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default Cart;