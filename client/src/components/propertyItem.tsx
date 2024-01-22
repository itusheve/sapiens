import { IPropertyItem } from "../interfaces";
import { Card, Button } from 'react-bootstrap'
import user from "../utils/user.service";

export const PropertyItemCard = (item: IPropertyItem) => {
    const currentUser = user.getUserData()
    const currencyFormatter = Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 3
    });
    let soldClass = "";
    let ribbonText = "";
    if (item.buyerID) {
        if (item.buyerID === currentUser.id) {
            soldClass = 'bought';
            ribbonText = 'You bought';
        } else {
            soldClass = 'sold';
            ribbonText = 'Sold'
        }
    }

    return (
        <>
            <div className="property-item">
                <Card style={{ width: '18rem' }}>
                    <div className={`corner-ribbon ${soldClass}`}>{ribbonText}</div>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>
                            {item.category}
                        </Card.Title>
                        <Card.Text>

                            <label className="price">{currencyFormatter.format(item.price)}</label>

                        </Card.Text>
                        {!item.buyerID &&
                            <Button variant="primary">Buy</Button>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    )


}