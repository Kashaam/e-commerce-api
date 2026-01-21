const { Roles, Status } = require("../../config/constant.config");
const mailSvc = require("../../services/mail.service");
const userSvc = require("../user/user.service");

class OrderNotification {
  emailToBeSend = [];
  async sendOrderDetailNotification(order, orderDetail) {
    try {
      await this.notifyAdmin(order, orderDetail);
      await this.notifyCustomer(orderDetail);
      await this.notifySeller(orderDetail);

      await Promise.allSettled(this.emailToBeSend);
    } catch (exception) {
      throw exception;
    }
  }

  async notifyAdmin(order, orderDetail) {
    try {
      const { data: allAdminUser } = await userSvc.getAllUser(
        {
          role: Roles.ADMIN,
          status: Status.ACTIVE,
        },
        {},
      );

      this.emailToBeSend.push(
        allAdminUser.map((user) => {
          return mailSvc.sendEmail({
            to: user.email,
            subject: "New Order Invoice #" + order.code,
            msg: `
            <h2>New Order Placed</h2>
            <p>A new order has been placed by ${order.buyer.name} on your platform.</p>
            
            <h3>Order Details</h3>
            <table style="border-collapse: collapse; width: 100%;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Order Code:</strong></td>
                    <td style="padding: 8px;">#${order.code}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Status:</strong></td>
                    <td style="padding: 8px;">${order.status}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Order Date:</strong></td>
                    <td style="padding: 8px;">${new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
            </table>

            <h3>Bill Summary</h3>
            <table style="border-collapse: collapse; width: 100%;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Sub Total:</strong></td>
                    <td style="padding: 8px;">Rs. ${order.subTotal}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Discounts:</strong></td>
                    <td style="padding: 8px;">-Rs. ${order.discounts}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Tax:</strong></td>
                    <td style="padding: 8px;">Rs. ${order.tax || 0}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Delivery Charge:</strong></td>
                    <td style="padding: 8px;">Rs. ${order.deliveryCharge || 0}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;"><strong>Service Charge:</strong></td>
                    <td style="padding: 8px;">Rs. ${order.serviceCharge || 0}</td>
                </tr>
                <tr style="background-color: #f0f0f0; font-weight: bold;">
                    <td style="padding: 8px;"><strong>Total Amount:</strong></td>
                    <td style="padding: 8px;">Rs. ${order.total}</td>
                </tr>
            </table>

            <p><strong>Payment Status:</strong> ${order.isPaid ? "Paid" : "Pending"}</p>
            <p>Please review and process this order accordingly.</p>
        `,
          });
        }),
      );
    } catch (exception) {
      throw exception;
    }
  }

  async notifyCustomer(orderDetail) {
    try {
      const customer = order.buyer;

      this.emailToBeSend.push(
        mailSvc.sendEmail({
          to: customer.email,
          subject: "Order placed ",
          msg: `
                        <h2>Order Confirmation</h2>
                        <p>Thank you for your order, ${customer.name}!</p>
                        
                        <h3>Order Details</h3>
                        <table style="border-collapse: collapse; width: 100%;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Order Code:</strong></td>
                                <td style="padding: 8px;">#${order.code}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Status:</strong></td>
                                <td style="padding: 8px;">${order.status}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Order Date:</strong></td>
                                <td style="padding: 8px;">${new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        </table>

                        <h3>Order Summary</h3>
                        <table style="border-collapse: collapse; width: 100%;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Sub Total:</strong></td>
                                <td style="padding: 8px;">Rs. ${order.subTotal}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Discounts:</strong></td>
                                <td style="padding: 8px;">-Rs. ${order.discounts}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Tax:</strong></td>
                                <td style="padding: 8px;">Rs. ${order.tax || 0}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px;"><strong>Delivery Charge:</strong></td>
                                <td style="padding: 8px;">Rs. ${order.deliveryCharge || 0}</td>
                            </tr>
                            <tr style="background-color: #f0f0f0; font-weight: bold;">
                                <td style="padding: 8px;"><strong>Total Amount:</strong></td>
                                <td style="padding: 8px;">Rs. ${order.total}</td>
                            </tr>
                        </table>

                        <p><strong>Payment Status:</strong> ${order.isPaid ? "Paid" : "Pending"}</p>

                        <div style="margin-top: 20px; text-align: center;">
                            <a href="${process.env.BASE_URL}/orders/${order.id}/verify" style="display: inline-block; padding: 10px 20px; margin-right: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Order</a>
                            <a href="${process.env.BASE_URL}/orders/${order.id}/cancel" style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">Cancel Order</a>
                        </div>

                        <p>If you did not place this order, please contact us immediately.</p>
                    `,
        }),
      );
    } catch (exception) {
      throw exception;
    }
  }

  async notifySeller(orderDetail) {
    try {
      orderDetail.map((item) => {
        this.emailToBeSend.push(
          mailSvc.sendEmail({
            to: item.seller.email,
            subject: "You have a new order!!!!!",
            msg: `
                    <h2>New Order for Your Product</h2>
                    <p>Hello ${item.seller.name},</p>
                    
                    <p>Good news! You have received a new order for your product.</p>
                    
                    <h3>Order Details</h3>
                    <table style="border-collapse: collapse; width: 100%;">
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Order Code:</strong></td>
                            <td style="padding: 8px;">#${item.order.code}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Product:</strong></td>
                            <td style="padding: 8px;">${item.product.name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Quantity:</strong></td>
                            <td style="padding: 8px;">${item.quantity}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Unit Price:</strong></td>
                            <td style="padding: 8px;">Rs. ${item.price}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Total:</strong></td>
                            <td style="padding: 8px;">Rs. ${item.total}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Customer:</strong></td>
                            <td style="padding: 8px;">${item.order.buyer.name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 8px;"><strong>Order Date:</strong></td>
                            <td style="padding: 8px;">${new Date(item.order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    </table>
                    
                    <p>Please prepare the product for shipment and update the order status accordingly.</p>
                    <p>Thank you for being part of our platform!</p>
                `,
          }),
        );
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const orderNtfy = new OrderNotification();
module.exports = orderNtfy;
