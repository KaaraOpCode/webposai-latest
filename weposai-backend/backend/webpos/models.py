from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Tenant model as you had it
class Tenant(models.Model):
    name = models.CharField(max_length=150, unique=True)
    domain = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# Custom User model inheriting from AbstractUser
class User(AbstractUser):
    ROLE_CHOICES = (
        ('cashier', 'Cashier'),
        ('manager', 'Manager'),
        ('admin', 'Admin'),
    )

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='users')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='cashier')

    # username, email, password, is_active, is_staff, is_superuser, last_login, date_joined
    # fields come from AbstractUser

    def __str__(self):
        return f"{self.username} ({self.role})"


# ----------------------------
# Store (Physical or Online)
# ----------------------------

class Store(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='stores')
    STORE_TYPE_CHOICES = (
        ('physical', 'Physical'),
        ('online', 'Online'),
    )
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200, blank=True, null=True)
    store_type = models.CharField(max_length=20, choices=STORE_TYPE_CHOICES, default='physical')

    def __str__(self):
        return f"{self.name} ({self.store_type})"


# ----------------------------
# Product Categories
# ----------------------------

class ProductCategory(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='product_categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


# ----------------------------
# Service Categories
# ----------------------------

class ServiceCategory(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='service_categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


# ----------------------------
# Products
# ----------------------------

class Product(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=30, unique=True)
    barcode = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, related_name='products')

    def __str__(self):
        return f"{self.name} ({self.sku})"


# ----------------------------
# Services
# ----------------------------

class Service(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, related_name='services')

    def __str__(self):
        return self.name


# ----------------------------
# Customers
# ----------------------------

class Customer(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ----------------------------
# Orders
# ----------------------------

class Order(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, related_name='orders')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=(
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ), default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"


# ----------------------------
# Sales and Sale Items
# ----------------------------

class Sale(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='sales')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True, related_name='sales')
    timestamp = models.DateTimeField(auto_now_add=True)
    cashier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sales')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='sales')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='sales')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=50, default='cash')  # simplified

    def __str__(self):
        return f"Sale #{self.id} - {self.timestamp.date()}"


class SaleItem(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='sale_items')
    sale = models.ForeignKey(Sale, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.SET_NULL, related_name='sale_items')
    service = models.ForeignKey(Service, null=True, blank=True, on_delete=models.SET_NULL, related_name='sale_items')
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def clean(self):
        from django.core.exceptions import ValidationError
        if not self.product and not self.service:
            raise ValidationError("SaleItem must have either a product or a service.")
        if self.product and self.service:
            raise ValidationError("SaleItem cannot have both a product and a service.")

    def __str__(self):
        if self.product:
            return f"{self.product.name} x {self.quantity}"
        else:
            return f"{self.service.name} x {self.quantity}"


# ----------------------------
# Inventory
# ----------------------------

class Inventory(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='inventories')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='inventories')
    quantity = models.PositiveIntegerField(default=0)
    minimum_stock_level = models.PositiveIntegerField(default=5)
    last_updated = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='created_inventories')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='updated_inventories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('tenant', 'product', 'store')

    def __str__(self):
        return f"Inventory: {self.product.name} at {self.store.name} — {self.quantity}"


class InventoryTransaction(models.Model):
    TRANSACTION_TYPES = (
        ('purchase', 'Purchase'),
        ('sale', 'Sale'),
        ('adjustment', 'Adjustment'),
        ('transfer_in', 'Transfer In'),
        ('transfer_out', 'Transfer Out'),
    )

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='inventory_transactions')
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    quantity = models.IntegerField()  # positive or negative depending on transaction type
    timestamp = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='created_inventory_transactions')

    def __str__(self):
        return (f"{self.transaction_type} of {self.quantity} for "
                f"{self.inventory.product.name} at {self.inventory.store.name} on {self.timestamp:%Y-%m-%d %H:%M}")

    class Meta:
        ordering = ['-timestamp']


# ----------------------------
# Market Till
# ----------------------------

class MarketTill(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='market_tills')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='market_tills')
    opening_balance = models.DecimalField(max_digits=10, decimal_places=2)
    closing_balance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    opened_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(blank=True, null=True)
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return f"Till for {self.store.name} ({'Open' if self.is_open else 'Closed'})"


# ----------------------------
# Transactions
# ----------------------------

class Transaction(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='transactions')
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='transactions')
    TRANSACTION_TYPES = (
        ('payment', 'Payment'),
        ('refund', 'Refund'),
    )
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES, default='payment')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type.capitalize()} of ${self.amount} for Sale #{self.sale.id}"


# ----------------------------
# Payments
# ----------------------------

class Payment(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='payments')
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    PAYMENT_METHODS = (
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('mobile', 'Mobile Money'),
        ('bank', 'Bank Transfer'),
    )
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    reference = models.CharField(max_length=100, blank=True, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Total payment amount
    commission_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='created_payments')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='updated_payments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.method.capitalize()} payment of ${self.amount}"


# ----------------------------
# Commissions
# ----------------------------

class Commission(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='commissions')
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='commissions')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                                   on_delete=models.SET_NULL, related_name='created_commissions')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commission of ${self.amount} for Payment #{self.payment.id}"


# ----------------------------
# Delivery (Local or Remote)
# ----------------------------

class Delivery(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='deliveries')
    DELIVERY_TYPE_CHOICES = (
        ('local', 'Local'),
        ('remote', 'Remote'),
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='deliveries')
    delivery_type = models.CharField(max_length=20, choices=DELIVERY_TYPE_CHOICES)
    delivered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='deliveries')
    delivery_date = models.DateTimeField(blank=True, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Delivery #{self.id} for Order #{self.order.id} ({self.delivery_type})"


# ----------------------------
# Promotions
# ----------------------------

class Promotion(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='promotions')
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Promo {self.code} ({self.discount_percent}%)"


# ----------------------------
# Taxes
# ----------------------------

class Tax(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='taxes')
    name = models.CharField(max_length=100)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.percentage}%)"


# ----------------------------
# Inventory Alerts
# ----------------------------

class InventoryAlert(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='inventory_alerts')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"Alert: {self.product.name} below threshold"


# ----------------------------
# Receipt PDF Record
# ----------------------------

class Receipt(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='receipts')
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, related_name='receipt')
    pdf_file = models.FileField(upload_to='receipts/')
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Receipt for Sale #{self.sale.id}"
