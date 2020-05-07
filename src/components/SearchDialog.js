import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { getNumbers } from 'utils';
import { connect } from 'react-redux'
import { SearchItem } from 'redux/index';
import {useHistory} from 'react-router-dom';

const SearchDialog = ({ itens_searched, SearchItem }) => {
    const history = useHistory();

    const handleSearch = (e) => {
        const item_name = e.target.value;
        SearchItem(item_name);
    }

    const handleItemClick = (item_id) => () =>{
        history.push(`/product/${item_id}`)
    }

    console.log('item', itens_searched)

    return (
        <SerchContent>
            <SearchHeader>
                <ArrowLeftIcon />
                <SearchText>Buscar Produtos</SearchText>
            </SearchHeader>
            <SearchInputContainer>
                <SearchInput onChange={handleSearch} placeholder="Digite o nome do produto..." />
            </SearchInputContainer>
            <ItensNumberContainer>
                <ItensNumberText>{itens_searched.length} itens</ItensNumberText>
            </ItensNumberContainer>
            <ItemList>
                {itens_searched.map((item) =>
                    <Item key={item.id} onClick={handleItemClick(item.id)}>
                        <ItemInfoGroup>
                            <ItemImage src={item.image} />
                            <ItemName>{item.name}</ItemName>
                        </ItemInfoGroup>
                        <ItemValueGroup>
                            <ItemPrice>{getNumbers(item.actual_price < item.regular_price ? item.actual_price : item.regular_price)}</ItemPrice>
                            <ItemParcelPrice>{item.installments}</ItemParcelPrice>
                        </ItemValueGroup>
                    </Item>
                )}
            </ItemList>
        </SerchContent>
    )
}

const SerchContent = styled.div`
    display: flex;
    background: #ddd;
    flex-direction: column;
    width: 300px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.8);
`;

const SearchHeader = styled.div`
    display: flex;
    padding: 10px;
    background: #fff;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.1);
`;

const ArrowLeftIcon = styled(FiArrowLeft)`
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

const SearchText = styled.span`
    margin: 0 auto;
`;

const SearchInputContainer = styled.div`
    display: flex;
    background: #eee;
`;

const SearchInput = styled.input`
    padding: 5px;
    margin: 10px;
    width: 100%;
`;

const ItensNumberContainer = styled.div`
    display: flex;
    background: #ddd;
`;

const ItensNumberText = styled.span`
    padding: 10px;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    background: #eee;
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.5);
    cursor: pointer;
`;

const ItemInfoGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: auto;
`;

const ItemImage = styled.img.attrs({ alt: 'Item Image' })`
    width: 100px;
    height: auto;
    margin-right: 10px;
`;

const ItemName = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
`;

const ItemValueGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemPrice = styled.span`
    font-weight: bold;
`;

const ItemParcelPrice = styled.span`
    font-size: 11px;
    color: #333;
`;

const mapStateToProps = state => ({
    itens_searched: state.searchReducer.itens_searched
});

const mapDispatchToProps = dispatch => ({
    SearchItem: (item_name) => dispatch(SearchItem(item_name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDialog);