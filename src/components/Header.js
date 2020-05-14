import React from 'react';
import styled from 'styled-components';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearch, showCart } from 'redux/index';

const Header = ({ cart_itens, itens_total_qty, setSearch, showCart }) => {
    const history = useHistory();

    const onClickLogo = () => {
        history.push("/");
    }

    const handleSearchClick = () => {
        setSearch(true);
        showCart(false);
    }

    const handleCartClick = () => {
        showCart(true);
        setSearch(false);
    }

    return (
        <HeaderBackground>
            <HeaderContent>
                <Logo onClick={onClickLogo}>
                    FASHIONISTA
                </Logo>
                <IconGroup>
                    <SearchIcon onClick={handleSearchClick} />
                    <BagGroup onClick={handleCartClick}>
                        <BagCount>{itens_total_qty}</BagCount>
                        <ShoppingBagIcon />
                    </BagGroup>
                </IconGroup>
            </HeaderContent>
        </HeaderBackground>
    );
}

const HeaderBackground = styled.header`
    background: #fff;
    display: flex;
    width: 100%;
    position: fixed;
    z-index: 20;
    height: 64px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
`;

const HeaderContent = styled.div`
    display: flex;
    flex:1;
    justify-content: space-between;
    max-width: 900px;
    margin: 0 auto;
    align-items: center;
`;

const Logo = styled.div.attrs({
    IndexOf: -1
})`
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
    padding: 10px;
`;

const IconGroup = styled.div`
    display: flex;
    padding: 10px;
`;

const SearchIcon = styled(FiSearch)
    .attrs({ size: 18 })`
    cursor: pointer;
    padding: 5px;
    margin: 8px;
    &:hover {
        color: red;
    }
`;

const BagGroup = styled.div`
    display: flex;
    position: relative;
    padding: 5px;
    margin: 8px;
    cursor: pointer;
    &:hover {
        color: red;
    }
`;

const ShoppingBagIcon = styled(FiShoppingBag)
    .attrs({ size: 18 })`
`;

const BagCount = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 0;
    left: 15px;
    bottom: 15px;
`;

const mapStateToProps = state => ({
    cart_itens: state.cartReducer.cart_itens,
    itens_total_qty: state.cartReducer.itens_total_qty
});

const mapDispatchToProps = dispatch => ({
    setSearch: (value) => dispatch(setSearch(value)),
    showCart: (value) => dispatch(showCart(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);