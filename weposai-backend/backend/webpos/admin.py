from django.contrib import admin
from .models import (
    Tenant, User, Store,
    Category,
    Product, VirtualProduct, Service,
    Customer, Contract, Vendor,
    Purchase, Inventory, InventoryTransaction, SurplusSupply,
    Sale, OrderItem, Payment, Refund,
    GiftCard, Promotion, Tax, Delivery,
    LoyaltyPoint, JournalEntry, Shift,
    Commission, KPI, ActionLog,
)

# --- Tenant ---
@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'email', 'subscription_plan', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('subscription_plan',)


# --- User ---
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'tenant', 'is_active', 'last_login')
    list_filter = ('role', 'is_active', 'tenant')
    search_fields = ('username', 'email')


# --- Store ---
@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'tenant', 'created_at')
    search_fields = ('name', 'location')
    list_filter = ('tenant',)


# --- Category ---
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant')
    search_fields = ('name',)
    list_filter = ('tenant',)


# --- Product ---
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'barcode', 'category', 'store', 'tenant', 'price', 'quantity', 'is_damaged', 'is_discounted', 'is_virtual', 'created_at')
    search_fields = ('name', 'sku', 'barcode')
    list_filter = ('category', 'tenant', 'store', 'is_damaged', 'is_discounted', 'is_virtual')


# --- VirtualProduct ---
@admin.register(VirtualProduct)
class VirtualProductAdmin(admin.ModelAdmin):
    list_display = ('product', 'virtual_type', 'provider_name', 'denomination', 'validity_period_days')
    search_fields = ('product__name', 'provider_name')
    list_filter = ('virtual_type',)


# --- Service ---
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'tenant', 'price', 'duration_minutes', 'created_at')
    search_fields = ('name',)
    list_filter = ('category', 'tenant')


# --- Customer ---
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'tenant', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('tenant',)


# --- Contract ---
@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ('contract_type', 'user', 'tenant', 'start_date', 'end_date', 'is_active')
    list_filter = ('contract_type', 'tenant', 'is_active')
    search_fields = ('user__username', 'tenant__name')


# --- Vendor ---
@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_person', 'phone', 'email', 'tenant', 'created_at')
    search_fields = ('name', 'contact_person', 'email')
    list_filter = ('tenant',)


# --- Purchase ---
@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'product', 'quantity', 'total_cost', 'purchased_at', 'tenant')
    search_fields = ('vendor__name', 'product__name')
    list_filter = ('tenant',)


# --- Inventory ---
@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'store', 'quantity', 'minimum_stock_level', 'tenant', 'last_updated')
    search_fields = ('product__name', 'store__name')
    list_filter = ('tenant', 'store')


# --- InventoryTransaction ---
@admin.register(InventoryTransaction)
class InventoryTransactionAdmin(admin.ModelAdmin):
    list_display = ('inventory', 'transaction_type', 'quantity', 'timestamp', 'tenant', 'created_by')
    search_fields = ('inventory__product__name', 'inventory__store__name')
    list_filter = ('transaction_type', 'tenant')


# --- SurplusSupply ---
@admin.register(SurplusSupply)
class SurplusSupplyAdmin(admin.ModelAdmin):
    list_display = ('product', 'store', 'quantity', 'recorded_at', 'tenant')
    search_fields = ('product__name', 'store__name')
    list_filter = ('tenant',)


# --- Sale ---
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'tenant', 'store', 'user', 'customer', 'total_amount', 'date')
    search_fields = ('id', 'user__username', 'customer__name')
    list_filter = ('tenant', 'store')


# --- OrderItem ---
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('sale', 'product', 'service', 'quantity', 'price')
    search_fields = ('product__name', 'service__name')
    list_filter = ('sale__tenant',)


# --- Payment ---
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('sale', 'method', 'amount', 'date', 'tenant', 'created_by')
    search_fields = ('sale__id',)
    list_filter = ('method', 'tenant')


# --- Refund ---
@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('sale', 'reason', 'amount', 'created_at', 'tenant')
    search_fields = ('sale__id',)
    list_filter = ('tenant',)


# --- GiftCard ---
@admin.register(GiftCard)
class GiftCardAdmin(admin.ModelAdmin):
    list_display = ('code', 'initial_amount', 'current_balance', 'issued_to', 'issued_by', 'issued_at', 'expires_at', 'is_active', 'tenant')
    search_fields = ('code', 'issued_to__name')
    list_filter = ('is_active', 'tenant')


# --- Promotion ---
@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percent', 'start_date', 'end_date', 'active', 'tenant')
    search_fields = ('code',)
    list_filter = ('active', 'tenant')


# --- Tax ---
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'percentage', 'is_active', 'tenant')
    search_fields = ('name',)
    list_filter = ('is_active', 'tenant')


# --- Delivery ---
@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('sale', 'delivery_type', 'delivered_by', 'delivery_date', 'tracking_number', 'delivery_fee', 'tenant')
    search_fields = ('sale__id', 'delivered_by__username', 'tracking_number')
    list_filter = ('delivery_type', 'tenant')


# --- LoyaltyPoint ---
@admin.register(LoyaltyPoint)
class LoyaltyPointAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'updated_at')
    search_fields = ('user__username',)
    list_filter = ()


# --- JournalEntry ---
@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'description', 'amount', 'entry_date')
    search_fields = ('description',)
    list_filter = ('tenant',)


# --- Shift ---
@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ('user', 'store', 'start_time', 'end_time', 'created_at')
    search_fields = ('user__username', 'store__name')
    list_filter = ('store',)


# --- Commission ---
@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'sale', 'amount', 'created_at')
    search_fields = ('user__username', 'sale__id')
    list_filter = ()


# --- KPI ---
@admin.register(KPI)
class KPIAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'name', 'value', 'calculated_at')
    search_fields = ('name',)
    list_filter = ('tenant',)


# --- ActionLog ---
@admin.register(ActionLog)
class ActionLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user', 'action_type', 'model_name', 'object_id', 'ip_address', 'tenant')
    search_fields = ('user__username', 'model_name', 'action_type', 'object_id')
    list_filter = ('action_type', 'tenant')
    readonly_fields = ('timestamp',)

