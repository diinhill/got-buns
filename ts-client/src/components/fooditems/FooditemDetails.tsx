import { Container } from 'reactstrap'
import { Fooditem } from '../../@types'

interface Props {
    fooditem: Fooditem
}

const FooditemDetails: React.FC<Props> = ({ fooditem }) => {

    return (

        <div className="cd-section" id="features">
            <Container>
                <p>purchased on: {fooditem.purchaseDate.toLocaleString().slice(0, 10)}</p>
                <p>due on: {fooditem.dueDate.toLocaleString().slice(0, 10)}</p>
                <p>price offer: {fooditem.price} €</p>
                <p>swap possible? {fooditem.swapPossible === true ? 'yes' : 'no'}</p>
                <p>reserved? {fooditem.reserved === true ? 'yes' : 'no'}</p>
                <p>last updated on: {fooditem.updated?.toLocaleString().slice(0, 10)}</p>
            </Container>
        </div>

    )
}
export default FooditemDetails