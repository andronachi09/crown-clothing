import { useNavigate } from 'react-router-dom';

import { Body, BackgroundImage, DirectoryItemContainer } from "./directory-item.styles"


const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigation = useNavigate();

    const onNavigateHandler = () => {
        navigation(route)
    };

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={ imageUrl }/>
            <Body>
                <h2>{title}</h2>
                <p>Shop now!</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;