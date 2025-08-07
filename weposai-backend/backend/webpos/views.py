from rest_framework import viewsets
from .models import *
from .serializers import *

# ----------------------------
# 1. User ViewSet
# ----------------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# ----------------------------
# 2. Tenant ViewSet
# ----------------------------

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
# ----------------------------
# 3. Store ViewSet
# ----------------------------

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
# ----------------------------
# 4. Product Category ViewSet
# ----------------------------

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
# ----------------------------
# 5. Service Category ViewSet
# ----------------------------

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
# ----------------------------
# 6. Product ViewSet
# ----------------------------

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
# ----------------------------
# 7. Service ViewSet
# ----------------------------

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
# ----------------------------
# 8. Customer ViewSet
# ----------------------------

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
# ----------------------------
# 9. Order ViewSet
# ----------------------------

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
# ----------------------------
# 10. Sale ViewSet
# ----------------------------

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
# ----------------------------
# 11. Sale Item ViewSet
# ----------------------------

class SaleItemViewSet(viewsets.ModelViewSet):
    queryset = SaleItem.objects.all()
    serializer_class = SaleItemSerializer
# ----------------------------
# 12. Inventory ViewSet
# ----------------------------

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
# ----------------------------
# 13. Inventory Transaction ViewSet
# ----------------------------

class InventoryTransactionViewSet(viewsets.ModelViewSet):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer
# ----------------------------
# 14. Market Till ViewSet
# ----------------------------

class MarketTillViewSet(viewsets.ModelViewSet):
    queryset = MarketTill.objects.all()
    serializer_class = MarketTillSerializer
# ----------------------------
# 15. Transaction ViewSet
# ----------------------------

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
# ----------------------------
# 16. Payment ViewSet
# ----------------------------

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
# ----------------------------
# 17. Commission ViewSet
# ----------------------------

class CommissionViewSet(viewsets.ModelViewSet):
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer
# ----------------------------
# 18. Delivery ViewSet
# ----------------------------

class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
# ----------------------------
# 19. Promotion ViewSet
# ----------------------------

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

# ----------------------------
# 20. Tax ViewSet
# ----------------------------

class TaxViewSet(viewsets.ModelViewSet):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer

# ----------------------------
# 21. Inventory Alert ViewSet
# ----------------------------

class InventoryAlertViewSet(viewsets.ModelViewSet):
    queryset = InventoryAlert.objects.all()
    serializer_class = InventoryAlertSerializer
# ----------------------------
# 22. Receipt ViewSet
# ----------------------------

class ReceiptViewSet(viewsets.ModelViewSet):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
