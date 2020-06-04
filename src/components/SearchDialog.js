import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux'
import { SearchItem } from 'store';
import { useHistory } from 'react-router-dom';
import { getNumbers } from 'utils';
import { useSearch } from 'hooks';

const SearchDialog = ({ closeDialog }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { itens_searched } = useSearch();

    const handleSearch = (e) => {
        const item_name = e.target.value;
        dispatch(SearchItem(item_name));
    }

    const handleItemClick = (item_id) => () => {
        history.push(`/product/${item_id}`)
    }

    const closePopup = () => {
        closeDialog()
    }

    return (
        <SerchContent>
            <SearchHeader>
                <ArrowLeftIcon onClick={closePopup} />
                <SearchText>Buscar Produtos</SearchText>
            </SearchHeader>
            <SearchInputContainer>
                <SearchInput onChange={handleSearch} placeholder="Digite o nome do produto..." />
            </SearchInputContainer>
            <ItensNumberContainer>
                <ItensNumberText>{itens_searched.length} itens</ItensNumberText>
            </ItensNumberContainer>
            <ItemList>
                {itens_searched.map((item) => {
                    const actual_price = getNumbers(item.actual_price);
                    const regular_price = getNumbers(item.regular_price);
                    return <div key={item.id} onClick={handleItemClick(item.id)}>
                        <Item>
                            <ItemImage src={item.image} />
                            <ItemInfoGroup width={90}>
                                <ItemName>{item.name}</ItemName>
                            </ItemInfoGroup>
                            <ItemValueGroup>
                                <ItemPrice>{(actual_price < regular_price) ? item.actual_price : item.regular_price}</ItemPrice>
                                <ItemParcelPrice>{item.installments}</ItemParcelPrice>
                            </ItemValueGroup>
                        </Item>
                    </div>
                }
                )}
            </ItemList>
        </SerchContent>
    )
}

const SerchContent = styled.div`
    display: flex;
    background: #ddd;
    flex-direction: column;
    width: 320px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    overflow: hidden;
    padding-bottom: 10px;   
`;

const SearchHeader = styled.div`
    display: flex;
    padding: 10px;
    background: #fff;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.5);
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
    overflow-y: auto;
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
    width: ${({ width }) => width ? width + 'px' : 'auto'};
    margin-left: 10px;
`;

const ItemImage = styled.img.attrs({ alt: 'Item Image' })`
    width: 100px;
    height: 126px;
`;

const ItemName = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
`;

const ItemValueGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`;

const ItemPrice = styled.span`
    font-weight: bold;
    font-size: 15px;
`;

const ItemParcelPrice = styled.span`
    font-size: 13px;
    color: #333;
`;

export default SearchDialog;