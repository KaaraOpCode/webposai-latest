from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


# ===== TENANT =====

class Tenant(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    tax_certificate = models.FileField(upload_to='tenant_docs/', blank=True, null=True)
    business_license = models.FileField(upload_to='tenant_docs/', blank=True, null=True)
    subscription_plan = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ===== USER =====

class User(AbstractUser):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='users')
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    ROLE_CHOICES = (
        ('cashier', 'Cashier'),
        ('manager', 'Manager'),
        ('admin', 'Admin'),
        ('customer', 'Customer'),
        ('supplier', 'Supplier'),
        ('employee', 'Employee'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    last_login = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


# ===== STORE =====

class Store(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='stores')
    name = models.CharField(max_length=100)
    location = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.location}"


# ===== CATEGORY (For Products and Services) =====

class Category(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


# ===== PRODUCT =====

class Product(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='products')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=50, unique=True)
    barcode = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    cost_price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.IntegerField(default=0)
    expiry_date = models.DateField(blank=True, null=True)

    # Damaged / Discounted / Surplus / PCU / Virtual flags
    is_damaged = models.BooleanField(default=False)
    damaged_quantity = models.PositiveIntegerField(default=0)
    is_discounted = models.BooleanField(default=False)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    surplus_quantity = models.PositiveIntegerField(default=0)
    supply_pcu = models.PositiveIntegerField(default=1, help_text="Units per counting unit (e.g., pack size)")

    is_virtual = models.BooleanField(default=False)
    validity_days = models.PositiveIntegerField(blank=True, null=True)
    max_redemptions = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def discounted_price(self):
        if self.is_discounted and self.discount_percent > 0:
            return self.price * (1 - self.discount_percent / 100)
        return self.price

    def __str__(self):
        return f"{self.name} ({self.sku})"


# ===== VIRTUAL PRODUCT DETAILS =====

class VirtualProduct(models.Model):
    VIRTUAL_TYPES = [
        ('airtime', 'Airtime'),
        ('voucher', 'Voucher'),
        ('electricity', 'Electricity'),
        ('data_bundle', 'Data Bundle'),
        ('subscription', 'Subscription'),
        ('other', 'Other'),
    ]

    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='virtual_details')
    virtual_type = models.CharField(max_length=50, choices=VIRTUAL_TYPES)
    provider_name = models.CharField(max_length=255, blank=True)
    denomination = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    validity_period_days = models.PositiveIntegerField(blank=True, null=True)
    terms_and_conditions = models.TextField(blank=True)

    def __str__(self):
        return f"{self.virtual_type.capitalize()} for {self.product.name}"


# ===== SERVICE =====

class Service(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='services')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='services')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ===== CUSTOMER =====

class Customer(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='customers')
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='customer_profile')
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ===== CONTRACTS (Employee, Supplier, Customer) =====

class Contract(models.Model):
    CONTRACT_TYPES = (
        ('employee', 'Employee'),
        ('supplier', 'Supplier'),
        ('customer', 'Customer'),
    )
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='contracts')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='contracts')
    contract_file = models.FileField(upload_to='contracts/')
    contract_type = models.CharField(max_length=20, choices=CONTRACT_TYPES)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.contract_type.title()} Contract ({self.user})"


# ===== VENDOR =====

class Vendor(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='vendors')
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ===== PURCHASE =====

class Purchase(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='purchases')
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='purchases')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchases')
    quantity = models.PositiveIntegerField()
    total_cost = models.DecimalField(max_digits=12, decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Purchase {self.quantity} of {self.product.name} from {self.vendor.name}"


# ===== INVENTORY =====

class Inventory(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='inventories')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='inventories')
    quantity = models.IntegerField(default=0)
    minimum_stock_level = models.PositiveIntegerField(default=5)
    last_updated = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='created_inventories')
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='updated_inventories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('tenant', 'product', 'store')

    def __str__(self):
        return f"{self.product.name} at {self.store.name} — {self.quantity}"


class InventoryTransaction(models.Model):
    TRANSACTION_TYPES = (
        ('restock', 'Restock'),
        ('sale', 'Sale'),
        ('adjustment', 'Adjustment'),
        ('transfer_in', 'Transfer In'),
        ('transfer_out', 'Transfer Out'),
        ('damage', 'Damage'),
        ('surplus', 'Surplus'),
    )
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='inventory_transactions')
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='created_inventory_transactions')

    def __str__(self):
        return f"{self.transaction_type} {self.quantity} of {self.inventory.product.name} at {self.inventory.store.name}"


# ===== SURPLUS SUPPLY =====

class SurplusSupply(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='surplus_supplies')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='surplus_supplies')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='surplus_supplies')
    quantity = models.PositiveIntegerField()
    recorded_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Surplus {self.quantity} of {self.product.name} at {self.store.name}"


# ===== SALE =====

class Sale(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='sales')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='sales')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sales')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='sales')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Sale #{self.id} - {self.total_amount}"


class OrderItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)

    def clean(self):
        from django.core.exceptions import ValidationError
        if not self.product and not self.service:
            raise ValidationError("OrderItem must have either a product or a service.")
        if self.product and self.service:
            raise ValidationError("OrderItem cannot have both a product and a service.")

    def __str__(self):
        if self.product:
            return f"{self.product.name} x {self.quantity}"
        else:
            return f"{self.service.name} x {self.quantity}"


# ===== PAYMENT =====

class Payment(models.Model):
    PAYMENT_METHODS = (
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('mobile', 'Mobile Money'),
        ('bank_transfer', 'Bank Transfer'),
        ('credit', 'Credit'),
    )
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='payments')
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='payments')
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reference = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='created_payments')
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='updated_payments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.method} payment of {self.amount}"


# ===== REFUND =====

class Refund(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='refunds')
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='refunds')
    reason = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Refund {self.amount} for Sale #{self.sale.id}"


# ===== GIFT CARD =====

class GiftCard(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='giftcards')
    code = models.CharField(max_length=100, unique=True)
    initial_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_balance = models.DecimalField(max_digits=12, decimal_places=2)
    issued_to = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='giftcards')
    issued_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='issued_giftcards')
    issued_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def redeem(self, amount):
        if amount <= self.current_balance:
            self.current_balance -= amount
            self.save()
            return True
        return False

    def __str__(self):
        return f"GiftCard {self.code} - Balance: {self.current_balance}"


# ===== PROMOTION =====

class Promotion(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='promotions')
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Promo {self.code} ({self.discount_percent}%)"


# ===== TAX =====

class Tax(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='taxes')
    name = models.CharField(max_length=100)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.percentage}%)"


# ===== DELIVERY =====

class Delivery(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='deliveries')
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='deliveries')
    delivery_type = models.CharField(max_length=20, choices=(('local', 'Local'), ('remote', 'Remote')))
    delivered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='deliveries')
    delivery_date = models.DateTimeField(blank=True, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    delivery_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"Delivery #{self.id} for Sale #{self.sale.id}"


# ===== LOYALTY POINTS =====

class LoyaltyPoint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loyalty_points')
    points = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.points} pts"


# ===== JOURNAL ENTRY =====

class JournalEntry(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='journal_entries')
    description = models.TextField()
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    entry_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"JournalEntry on {self.entry_date} - {self.amount}"


# ===== SHIFT =====

class Shift(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shifts')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='shifts')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Shift at {self.store.name}"


# ===== COMMISSION =====

class Commission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commissions')
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='commissions')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commission {self.amount} for {self.user.username}"


# ===== KPI =====

class KPI(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='kpis')
    name = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=12, decimal_places=2)
    calculated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.value}"


# ===== ACTION LOG =====
# Logs any user action on models, especially for security/audit (e.g. fiddling accounts)

class ActionLog(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='action_logs')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='action_logs')
    model_name = models.CharField(max_length=100)
    object_id = models.CharField(max_length=100)
    action_type = models.CharField(max_length=50)  # e.g. "create", "update", "delete", "login", "failed_login", "permission_change"
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    details = models.TextField(blank=True)

    def __str__(self):
        return f"{self.timestamp} - {self.user} performed {self.action_type} on {self.model_name} ({self.object_id})"
