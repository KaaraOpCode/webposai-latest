from rest_framework import serializers
from .models import (
    Tenant, User, Store,
    ProductCategory, ServiceCategory, Product, Service,
    Customer, Order, Sale, SaleItem,
    Inventory, InventoryTransaction,
    MarketTill, Transaction, Payment, Commission,
    Delivery, Promotion, Tax,
    InventoryAlert, Receipt
)

# ----------------------------
# Tenant Serializer
# ----------------------------

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'name', 'domain', 'created_at']


# ----------------------------
# User Serializer
# ----------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'tenant']


# ----------------------------
# Store Serializer
# ----------------------------

class StoreSerializer(serializers.ModelSerializer):
    tenant = TenantSerializer(read_only=True)

    class Meta:
        model = Store
        fields = ['id', 'name', 'location', 'store_type', 'tenant']


# ----------------------------
# Product Category Serializer
# ----------------------------

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'description', 'tenant']


# ----------------------------
# Service Category Serializer
# ----------------------------

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'tenant']


# ----------------------------
# Product Serializer
# ----------------------------

class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    store = StoreSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'sku', 'barcode', 'price', 'discount',
            'quantity', 'alert_threshold', 'unit_type',
            'category', 'store', 'tenant'
        ]


# ----------------------------
# Service Serializer
# ----------------------------

class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'description', 'price',
            'category', 'tenant'
        ]


# ----------------------------
# Customer Serializer
# ----------------------------

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'created_at', 'tenant']


# ----------------------------
# Order Serializer
# ----------------------------

class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    store = StoreSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'store', 'status',
            'created_at', 'updated_at', 'created_by', 'tenant'
        ]


# ----------------------------
# Sale Item Serializer
# ----------------------------

class SaleItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'product', 'service', 'quantity', 'price_at_sale', 'subtotal', 'tenant']


# ----------------------------
# Sale Serializer
# ----------------------------

class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True, read_only=True)
    cashier = UserSerializer(read_only=True)
    store = StoreSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Sale
        fields = [
            'id', 'order', 'timestamp', 'cashier',
            'store', 'customer', 'total', 'payment_method', 'items', 'tenant'
        ]


# ----------------------------
# Inventory Serializer
# ----------------------------

class InventorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    store = StoreSerializer(read_only=True)

    class Meta:
        model = Inventory
        fields = ['id', 'product', 'store', 'quantity', 'minimum_stock_level', 'tenant']


# ----------------------------
# Inventory Transaction Serializer
# ----------------------------

class InventoryTransactionSerializer(serializers.ModelSerializer):
    inventory = InventorySerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = InventoryTransaction
        fields = ['id', 'inventory', 'transaction_type', 'quantity', 'timestamp', 'user', 'tenant']


# ----------------------------
# Market Till Serializer
# ----------------------------

class MarketTillSerializer(serializers.ModelSerializer):
    store = StoreSerializer(read_only=True)
    opened_by = UserSerializer(read_only=True)
    closed_by = UserSerializer(read_only=True)

    class Meta:
        model = MarketTill
        fields = [
            'id', 'store', 'opening_balance', 'closing_balance',
            'opened_at', 'closed_at', 'is_open',
            'opened_by', 'closed_by', 'tenant'
        ]


# ----------------------------
# Transaction Serializer
# ----------------------------

class TransactionSerializer(serializers.ModelSerializer):
    sale = SaleSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'sale', 'transaction_type', 'amount', 'timestamp', 'tenant']


# ----------------------------
# Payment Serializer
# ----------------------------

class PaymentSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'transaction', 'method', 'reference', 'amount', 'commission_amount', 'tenant']


# ----------------------------
# Commission Serializer
# ----------------------------

class CommissionSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Commission
        fields = ['id', 'payment', 'amount', 'tenant']


# ----------------------------
# Delivery Serializer
# ----------------------------

class DeliverySerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    delivered_by = UserSerializer(read_only=True)

    class Meta:
        model = Delivery
        fields = [
            'id', 'order', 'delivery_type', 'delivered_by',
            'delivery_date', 'tracking_number', 'delivery_fee', 'tenant'
        ]


# ----------------------------
# Promotion Serializer
# ----------------------------

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ['id', 'code', 'description', 'discount_percent', 'start_date', 'end_date', 'active', 'tenant']


# ----------------------------
# Tax Serializer
# ----------------------------

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ['id', 'name', 'percentage', 'description', 'active', 'tenant']


# ----------------------------
# Inventory Alert Serializer
# ----------------------------

class InventoryAlertSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = InventoryAlert
        fields = ['id', 'product', 'created_at', 'resolved', 'tenant']


# ----------------------------
# Receipt Serializer
# ----------------------------

class ReceiptSerializer(serializers.ModelSerializer):
    sale = SaleSerializer(read_only=True)

    class Meta:
        model = Receipt
        fields = ['id', 'sale', 'pdf_file', 'generated_at', 'tenant']
