import React, {
  MouseEvent,
  useState,
  SyntheticEvent
} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import LogoDefault from '@/assets/img/logo.png';
import {
  Box,
  Tabs,
  Tab,
  Container
} from '@mui/material';
import CartComponent from '@/components/Cart'
import {ILinkTab} from '@/types';

const LinkTab = (props: ILinkTab) => {
  const navigate = useNavigate();
  return(
    <Tab
      component="a"
      onClick={ (event: MouseEvent<HTMLAnchorElement> ) => {
        event.preventDefault();
        navigate(props.href)
        console.log(props)
      }}
      {...props}
    />
  )
}

const Header: React.FC = () => {
  const [ value, setValue ] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return(
    <Container className="nav-container">
    <Box component="div" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <Link to="/">
        <img src={LogoDefault} className="logo" alt="Logo"/>
      </Link>
      <Tabs value={value} onChange={handleChange} style={{ maxHeight: 42}}>
        <LinkTab label="Home" href="/" />
        <LinkTab label="Checkout" href="/checkout" />
        <LinkTab label="Jogos" href="/checkout" />
        <LinkTab label="Meias" href="/checkout" />
      </Tabs>
      <CartComponent />
    </Box>
    </Container>
  )
}

export default Header