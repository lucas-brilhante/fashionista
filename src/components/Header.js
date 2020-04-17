import React from 'react';
import styled from 'styled-components';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearch } from 'redux/index';

const Header = ({setSearch}) => {
    const history = useHistory();

    const onClickLogo = () => {
        history.push("/");
    }

    const handleSearchClick = () =>{
        setSearch(true);
    }

    return (
        <HeaderBackground>
            <HeaderContent>
                <Logo onClick={onClickLogo}>
                    FASHIONISTA
                </Logo>
                <IconGroup>
                    <SearchIcon onClick={handleSearchClick} />
                    <ShoppingBagIcon />
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

const ShoppingBagIcon = styled(FiShoppingBag)
    .attrs({ size: 18 })`
    cursor: pointer;
    padding: 5px;
    margin: 8px;
    &:hover {
        color: red;
    }
`;

const mapDispatchToProps = dispatch => ({
    setSearch: (value) => dispatch(setSearch(value))
});

export default connect(null, mapDispatchToProps)(Header);