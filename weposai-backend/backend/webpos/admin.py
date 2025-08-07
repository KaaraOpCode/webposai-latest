from django.contrib import admin
from .models import (
    Tenant, User, Store, Category,
    Product, VirtualProduct, Service,
    Customer, Contract, Vendor,
    Purchase, Inventory, InventoryTransaction,
    SurplusSupply, Sale, OrderItem,
    Payment, Refund, GiftCard,
    Promotion, Tax, Delivery,
    LoyaltyPoint, JournalEntry,
    Shift, Commission, KPI,
    ActionLog,
)

# --- TENANT ---
@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subscription_plan', 'created_at', 'updated_at')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')


# --- USER ---
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'tenant', 'is_active', 'last_login')
    list_filter = ('role', 'is_active', 'tenant')
    search_fields = ('username', 'email')
    autocomplete_fields = ['tenant']
    readonly_fields = ('last_login',)


# --- STORE ---
@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'tenant', 'created_at')
    list_filter = ('tenant',)
    search_fields = ('name', 'location')
    autocomplete_fields = ['tenant']
    readonly_fields = ('created_at',)


# --- CATEGORY ---
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant', 'description')
    list_filter = ('tenant',)
    search_fields = ('name', 'description')
    autocomplete_fields = ['tenant']


# --- PRODUCT ---
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'sku', 'barcode', 'category', 'tenant', 'store',
        'price', 'cost_price', 'quantity', 'is_damaged', 'damaged_quantity',
        'is_discounted', 'discount_percent', 'surplus_quantity', 'supply_pcu',
        'is_virtual', 'expiry_date', 'created_at', 'updated_at',
    )
    search_fields = ('name', 'sku', 'barcode')
    list_filter = ('tenant', 'store', 'category', 'is_damaged', 'is_discounted', 'is_virtual')
    autocomplete_fields = ['tenant', 'store', 'category']
    readonly_fields = ('created_at', 'updated_at')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('tenant', 'store', 'category')


# --- VIRTUAL PRODUCT DETAILS ---
@admin.register(VirtualProduct)
class VirtualProductAdmin(admin.ModelAdmin):
    list_display = ('product', 'virtual_type', 'provider_name', 'denomination', 'validity_period_days')
    search_fields = ('product__name', 'provider_name')
    autocomplete_fields = ['product']


# --- SERVICE ---
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'tenant', 'price', 'duration_minutes', 'created_at')
    list_filter = ('tenant', 'category')
    search_fields = ('name',)
    autocomplete_fields = ['tenant', 'category']
    readonly_fields = ('created_at',)


# --- CUSTOMER ---
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'tenant', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('tenant',)
    autocomplete_fields = ['tenant', 'user']
    readonly_fields = ('created_at',)


# --- CONTRACT ---
@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ('contract_type', 'user', 'tenant', 'start_date', 'end_date', 'is_active', 'created_at')
    list_filter = ('contract_type', 'tenant', 'is_active')
    search_fields = ('user__username',)
    autocomplete_fields = ['tenant', 'user']
    readonly_fields = ('created_at',)


# --- VENDOR ---
@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_person', 'phone', 'email', 'tenant', 'created_at')
    search_fields = ('name', 'contact_person', 'phone', 'email')
    list_filter = ('tenant',)
    autocomplete_fields = ['tenant']
    readonly_fields = ('created_at',)


# --- PURCHASE ---
@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('product', 'vendor', 'tenant', 'quantity', 'total_cost', 'purchased_at')
    search_fields = ('product__name', 'vendor__name')
    list_filter = ('tenant',)
    autocomplete_fields = ['tenant', 'product', 'vendor']
    readonly_fields = ('purchased_at',)


# --- INVENTORY ---
@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'store', 'tenant', 'quantity', 'minimum_stock_level', 'last_updated', 'created_by', 'updated_by')
    list_filter = ('tenant', 'store', 'product')
    search_fields = ('product__name',)
    autocomplete_fields = ['tenant', 'product', 'store', 'created_by', 'updated_by']
    readonly_fields = ('last_updated', 'created_at', 'updated_at')


# --- INVENTORY TRANSACTION ---
@admin.register(InventoryTransaction)
class InventoryTransactionAdmin(admin.ModelAdmin):
    list_display = ('inventory', 'transaction_type', 'quantity', 'timestamp', 'tenant', 'created_by')
    list_filter = ('tenant', 'transaction_type')
    search_fields = ('inventory__product__name',)
    autocomplete_fields = ['tenant', 'inventory', 'created_by']
    readonly_fields = ('timestamp',)


# --- SURPLUS SUPPLY ---
@admin.register(SurplusSupply)
class SurplusSupplyAdmin(admin.ModelAdmin):
    list_display = ('product', 'store', 'tenant', 'quantity', 'recorded_at')
    list_filter = ('tenant', 'store')
    search_fields = ('product__name',)
    autocomplete_fields = ['tenant', 'product', 'store']
    readonly_fields = ('recorded_at',)


# --- SALE ---

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    autocomplete_fields = ['product', 'service']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'tenant', 'store', 'user', 'customer', 'total_amount', 'date')
    list_filter = ('tenant', 'store')
    search_fields = ('id', 'user__username', 'customer__name')
    autocomplete_fields = ['tenant', 'store', 'user', 'customer']
    inlines = [OrderItemInline]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('tenant', 'store', 'user', 'customer')


# --- PAYMENT ---
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('sale', 'method', 'amount', 'tenant', 'date', 'created_by', 'updated_by')
    list_filter = ('tenant', 'method')
    search_fields = ('sale__id',)
    autocomplete_fields = ['tenant', 'sale', 'created_by', 'updated_by']
    readonly_fields = ('date', 'created_at', 'updated_at')


# --- REFUND ---
@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('sale', 'tenant', 'amount', 'reason', 'created_at')
    list_filter = ('tenant',)
    search_fields = ('sale__id',)
    autocomplete_fields = ['tenant', 'sale']
    readonly_fields = ('created_at',)


# --- GIFT CARD ---
@admin.register(GiftCard)
class GiftCardAdmin(admin.ModelAdmin):
    list_display = ('code', 'tenant', 'initial_amount', 'current_balance', 'issued_to', 'issued_by', 'issued_at', 'expires_at', 'is_active')
    search_fields = ('code', 'issued_to__name', 'issued_by__username')
    list_filter = ('tenant', 'is_active')
    autocomplete_fields = ['tenant', 'issued_to', 'issued_by']
    readonly_fields = ('issued_at',)


# --- PROMOTION ---
@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('code', 'tenant', 'discount_percent', 'start_date', 'end_date', 'active')
    list_filter = ('tenant', 'active')
    search_fields = ('code',)
    autocomplete_fields = ['tenant']


# --- TAX ---
@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = ('name', 'tenant', 'percentage', 'is_active')
    list_filter = ('tenant', 'is_active')
    search_fields = ('name',)
    autocomplete_fields = ['tenant']


# --- DELIVERY ---
@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('sale', 'tenant', 'delivery_type', 'delivered_by', 'delivery_date', 'tracking_number', 'delivery_fee')
    list_filter = ('tenant', 'delivery_type')
    search_fields = ('sale__id', 'delivered_by__username')
    autocomplete_fields = ['tenant', 'sale', 'delivered_by']
    readonly_fields = ('delivery_date',)


# --- LOYALTY POINT ---
@admin.register(LoyaltyPoint)
class LoyaltyPointAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'updated_at')
    search_fields = ('user__username',)
    autocomplete_fields = ['user']
    readonly_fields = ('updated_at',)


# --- JOURNAL ENTRY ---
@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'description', 'amount', 'entry_date')
    list_filter = ('tenant',)
    search_fields = ('description',)
    autocomplete_fields = ['tenant']


# --- SHIFT ---
@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ('user', 'store', 'start_time', 'end_time', 'created_at')
    search_fields = ('user__username', 'store__name')
    autocomplete_fields = ['user', 'store']
    readonly_fields = ('created_at',)


# --- COMMISSION ---
@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'sale', 'amount', 'created_at')
    search_fields = ('user__username', 'sale__id')
    autocomplete_fields = ['user', 'sale']
    readonly_fields = ('created_at',)


# --- KPI ---
@admin.register(KPI)
class KPIAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'name', 'value', 'calculated_at')
    list_filter = ('tenant',)
    search_fields = ('name',)
    autocomplete_fields = ['tenant']
    readonly_fields = ('calculated_at',)


# --- ACTION LOG ---
@admin.register(ActionLog)
class ActionLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user', 'action_type', 'model_name', 'object_id', 'ip_address')
    list_filter = ('tenant', 'action_type')
    search_fields = ('user__username', 'model_name', 'object_id', 'details')
    autocomplete_fields = ['tenant', 'user']
    readonly_fields = ('timestamp',)


# Optional: Customize admin site header and titles for clarity
admin.site.site_header = "WebPOS Admin"
admin.site.site_title = "WebPOS Admin Portal"
admin.site.index_title = "Welcome to the WebPOS Administration"

