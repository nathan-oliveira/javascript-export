import PaymentSubject from "./subjects/paymentSubject.js"
import Payment from "./events/payment.js";
import Shipment from "./observers/shipment.js";
import Marketing from "./observers/marketing.js";

const subject = new PaymentSubject();
const shipment = new Shipment();
subject.subscribe(shipment)

const marketing = new Marketing();
subject.subscribe(marketing)

const payment = new Payment(subject);
payment.creditCard({ userName: 'nathan', id: Date.now() })

subject.unsubscribe(marketing)
payment.creditCard({ userName: 'fulano', id: Date.now() })
