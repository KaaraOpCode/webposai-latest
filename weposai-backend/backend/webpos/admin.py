from django.contrib import admin
from .models import (
    Tenant, User, Store,
    ProductCategory, ServiceCategory,
    Product, Service,
    Customer, Order,
    Sale, SaleItem,
    Inventory, InventoryTransaction,
    MarketTill, Transaction, Payment, Commission,
    Delivery, Promotion, Tax,
    InventoryAlert, Receipt,
)

# --- Tenant ---
@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'domain', 'created_at')
    search_fields = ('name', 'domain')


# --- User ---
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'tenant', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'tenant')
    search_fields = ('username', 'email')


# --- Store ---
@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'store_type', 'location', 'tenant')
    list_filter = ('store_type', 'tenant')
    search_fields = ('name', 'location')


# --- ProductCategory ---
@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant')
    search_fields = ('name',)
    list_filter = ('tenant',)


# --- ServiceCategory ---
@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant')
    search_fields = ('name',)
    list_filter = ('tenant',)


# --- Product ---
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'price', 'category', 'tenant')
    search_fields = ('name', 'sku')
    list_filter = ('category', 'tenant')


# --- Service ---
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'tenant')
    search_fields = ('name',)
    list_filter = ('category', 'tenant')


# --- Customer ---
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'tenant', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('tenant',)


# --- Order ---
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'store', 'status', 'tenant', 'created_at', 'updated_at')
    list_filter = ('status', 'tenant', 'store')
    search_fields = ('id', 'customer__name')


# --- Sale ---
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'cashier', 'store', 'customer', 'total', 'payment_method', 'tenant')
    list_filter = ('payment_method', 'tenant', 'store')
    search_fields = ('cashier__username', 'customer__name')


# --- SaleItem ---
@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = ('sale', 'product', 'service', 'quantity', 'subtotal', 'tenant')
    list_filter = ('tenant',)
    search_fields = ('product__name', 'service__name')


# --- Inventory ---
@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'store', 'quantity', 'minimum_stock_level', 'tenant')
    list_filter = ('tenant', 'store', 'product')
    search_fields = ('product__name',)


# --- InventoryTransaction ---
@admin.register(InventoryTransaction)
class InventoryTransactionAdmin(admin.ModelAdmin):
    list_display = ('inventory', 'transaction_type', 'quantity', 'timestamp', 'tenant')
    list_filter = ('transaction_type', 'tenant')
    search_fields = ('inventory__product__name',)


# --- MarketTill ---
@admin.register(MarketTill)
class MarketTillAdmin(admin.ModelAdmin):
    list_display = ('store', 'opening_balance', 'closing_balance', 'opened_at', 'closed_at', 'is_open', 'tenant')
    list_filter = ('is_open', 'tenant', 'store')


# --- Transaction ---
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('sale', 'transaction_type', 'amount', 'timestamp', 'tenant')
    list_filter = ('transaction_type', 'tenant')
    search_fields = ('sale__id',)


# --- Payment ---
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('transaction', 'method', 'amount', 'commission_amount', 'tenant')
    list_filter = ('method', 'tenant')
    search_fields = ('transaction__sale__id',)


# --- Commission ---
@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('payment', 'amount', 'tenant')
    search_fields = ('payment__id',)
    list_filter = ('tenant',)


# --- Delivery ---
@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('order', 'delivery_type', 'delivered_by', 'delivery_date', 'tenant')
    list_filter = ('delivery_type', 'tenant')
    search_fields = ('order__id', 'delivered_by__username')


# --- Promotion ---
@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percent', 'start_date', 'end_date', 'active', 'tenant')
    list_filter = ('active', 'tenant')
    search_fields = ('code',)


# --- Tax ---
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'percentage', 'active', 'tenant')
    list_filter = ('active', 'tenant')
    search_fields = ('name',)


# --- InventoryAlert ---
@admin.register(InventoryAlert)
class InventoryAlertAdmin(admin.ModelAdmin):
    list_display = ('product', 'created_at', 'resolved', 'tenant')
    list_filter = ('resolved', 'tenant')
    search_fields = ('product__name',)


# --- Receipt ---
@admin.register(Receipt)
class ReceiptAdmin(admin.ModelAdmin):
    list_display = ('sale', 'generated_at', 'tenant')
    search_fields = ('sale__id',)
