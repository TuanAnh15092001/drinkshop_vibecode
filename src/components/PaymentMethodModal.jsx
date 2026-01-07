import { useState } from 'react';
import { X, Building2, Check, Copy, Loader, CheckCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../data/products';
import { createOrder } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import './PaymentMethodModal.css';

// Bank account details
const BANK_CONFIG = {
    bankCode: 'TCB',
    accountNo: '15098888888888',
    accountName: 'NGUYEN TUAN ANH',
    template: 'compact2'
};

const MOMO_PHONE = '0369829547';

const PaymentMethodModal = ({ isOpen, onClose, totalAmount, cartItems, onPaymentSuccess }) => {
    const { currentUser } = useAuth();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

    if (!isOpen) return null;

    // Generate VietQR URL with amount
    const generateVietQRUrl = (amount) => {
        const description = encodeURIComponent(`Thanh toan don hang DrinkShop`);
        return `https://img.vietqr.io/image/${BANK_CONFIG.bankCode}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${amount}&addInfo=${description}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;
    };

    // Generate MoMo QR URL
    const generateMoMoQRUrl = (amount) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=2|99|${MOMO_PHONE}|||0|0|${amount}|Thanh toan DrinkShop`;
    };

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(BANK_CONFIG.accountNo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBack = () => {
        setSelectedMethod(null);
    };

    const handleClose = () => {
        setSelectedMethod(null);
        setPaymentSuccess(false);
        setOrderId(null);
        onClose();
    };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        try {
            // Create order in Firestore
            const orderData = {
                userId: currentUser?.uid || 'guest',
                userEmail: currentUser?.email || 'Khách vãng lai',
                userName: currentUser?.displayName || 'Khách hàng',
                items: cartItems,
                totalAmount: totalAmount,
                paymentMethod: selectedMethod === 'bank' ? 'Chuyển khoản ngân hàng' : 'MoMo',
                paymentStatus: 'pending'
            };
            
            const newOrderId = await createOrder(orderData);
            setOrderId(newOrderId);
            setPaymentSuccess(true);
            
            // Notify parent to clear cart
            if (onPaymentSuccess) {
                onPaymentSuccess(newOrderId);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setIsProcessing(false);
        }
    };

    // Success Screen
    if (paymentSuccess) {
        return (
            <div className="payment-modal-overlay" onClick={handleClose}>
                <div className="payment-modal success-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="success-content">
                        <div className="success-icon">
                            <CheckCircle size={80} />
                        </div>
                        <h2>Đặt hàng thành công!</h2>
                        <p className="order-id">Mã đơn hàng: <strong>#{orderId?.slice(-8).toUpperCase()}</strong></p>
                        <p className="success-message">
                            Đơn hàng của bạn đang chờ xác nhận thanh toán. 
                            Chúng tôi sẽ xử lý trong 5-10 phút sau khi nhận được tiền.
                        </p>
                        <button className="btn btn-primary btn-lg" onClick={handleClose}>
                            <ShoppingBag size={20} />
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-modal-overlay" onClick={handleClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>
                    <X size={24} />
                </button>

                {!selectedMethod ? (
                    <>
                        <h2 className="modal-title">Chọn phương thức thanh toán</h2>
                        <p className="modal-subtitle">Tổng thanh toán: <strong>{formatPrice(totalAmount)}</strong></p>

                        <div className="payment-options">
                            <button 
                                className="payment-option"
                                onClick={() => setSelectedMethod('bank')}
                            >
                                <div className="option-icon bank-icon">
                                    <Building2 size={32} />
                                </div>
                                <div className="option-info">
                                    <span className="option-name">Chuyển khoản ngân hàng</span>
                                    <span className="option-desc">Quét mã QR hoặc chuyển khoản thủ công</span>
                                </div>
                            </button>

                            <button 
                                className="payment-option"
                                onClick={() => setSelectedMethod('momo')}
                            >
                                <div className="option-icon momo-icon">
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" />
                                </div>
                                <div className="option-info">
                                    <span className="option-name">Ví MoMo</span>
                                    <span className="option-desc">Thanh toán nhanh qua ví điện tử</span>
                                </div>
                            </button>
                        </div>
                    </>
                ) : selectedMethod === 'bank' ? (
                    <>
                        <button className="modal-back" onClick={handleBack}>← Quay lại</button>
                        <h2 className="modal-title">Chuyển khoản ngân hàng</h2>
                        
                        <div className="qr-section">
                            <div className="qr-code">
                                <img 
                                    src={generateVietQRUrl(totalAmount)} 
                                    alt="VietQR Code"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/250?text=QR+Error';
                                    }}
                                />
                            </div>
                            <p className="qr-instruction">Quét mã QR để thanh toán <strong>{formatPrice(totalAmount)}</strong></p>
                        </div>

                        <div className="bank-details">
                            <div className="bank-row">
                                <span className="label">Ngân hàng:</span>
                                <span className="value">Techcombank (TCB)</span>
                            </div>
                            <div className="bank-row">
                                <span className="label">Số tài khoản:</span>
                                <span className="value account-number">
                                    {BANK_CONFIG.accountNo}
                                    <button className="copy-btn" onClick={handleCopyAccount}>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </span>
                            </div>
                            <div className="bank-row">
                                <span className="label">Chủ tài khoản:</span>
                                <span className="value">{BANK_CONFIG.accountName}</span>
                            </div>
                            <div className="bank-row">
                                <span className="label">Số tiền:</span>
                                <span className="value amount">{formatPrice(totalAmount)}</span>
                            </div>
                        </div>

                        <button 
                            className="btn btn-primary btn-lg btn-block confirm-payment-btn"
                            onClick={handleConfirmPayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader size={20} className="spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Check size={20} />
                                    Tôi đã thanh toán
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <button className="modal-back" onClick={handleBack}>← Quay lại</button>
                        <h2 className="modal-title">Thanh toán MoMo</h2>
                        
                        <div className="qr-section">
                            <div className="qr-code momo-qr">
                                <img 
                                    src={generateMoMoQRUrl(totalAmount)} 
                                    alt="MoMo QR Code"
                                />
                            </div>
                            <p className="qr-instruction">Quét mã QR bằng ứng dụng MoMo</p>
                        </div>

                        <div className="bank-details">
                            <div className="bank-row">
                                <span className="label">Số điện thoại:</span>
                                <span className="value">{MOMO_PHONE}</span>
                            </div>
                            <div className="bank-row">
                                <span className="label">Số tiền:</span>
                                <span className="value amount">{formatPrice(totalAmount)}</span>
                            </div>
                            <div className="bank-row">
                                <span className="label">Nội dung:</span>
                                <span className="value">Thanh toan DrinkShop</span>
                            </div>
                        </div>

                        <button 
                            className="btn btn-primary btn-lg btn-block confirm-payment-btn"
                            onClick={handleConfirmPayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader size={20} className="spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Check size={20} />
                                    Tôi đã thanh toán
                                </>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentMethodModal;
