from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from rest_framework import routers  # type: ignore
from .views import *

# ----------------------------
# DRF Router setup
# ----------------------------
router = routers.DefaultRouter()

# User & Tenant
router.register(r'users', UserViewSet)
router.register(r'tenants', TenantViewSet)

# Stores
router.register(r'stores', StoreViewSet)

# Product & Service Categories
router.register(r'product-categories', ProductCategoryViewSet)
router.register(r'service-categories', ServiceCategoryViewSet)

# Products & Services
router.register(r'products', ProductViewSet)
router.register(r'services', ServiceViewSet)

# Customers & Orders
router.register(r'customers', CustomerViewSet)
router.register(r'orders', OrderViewSet)

# Sales & Sale Items
router.register(r'sales', SaleViewSet)
router.register(r'sale-items', SaleItemViewSet)

# Inventory & Transactions
router.register(r'inventories', InventoryViewSet)
router.register(r'inventory-transactions', InventoryTransactionViewSet)

# Market Tills
router.register(r'market-tills', MarketTillViewSet)

# Financial Transactions
router.register(r'transactions', TransactionViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'commissions', CommissionViewSet)

# Delivery, Promotions, Taxes
router.register(r'deliveries', DeliveryViewSet)
router.register(r'promotions', PromotionViewSet)
router.register(r'taxes', TaxViewSet)

# Alerts & Receipts
router.register(r'inventory-alerts', InventoryAlertViewSet)
router.register(r'receipts', ReceiptViewSet)

# ----------------------------
# URL patterns
# ----------------------------
urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),

    # API v1 routes
    path('api/v1/', include(router.urls)),

    # DRF login/logout views for browsable API
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
