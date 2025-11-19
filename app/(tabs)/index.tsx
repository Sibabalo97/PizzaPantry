import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

// Import components
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import InventoryListScreen from '../screens/Inventory/InventoryListScreen';
import ItemDetailScreen from '../screens/Inventory/ItemDetailScreen';
import AddEditItemScreen from '../screens/Inventory/EditItemScreen';
import AdjustQuantityScreen from '../screens/Inventory/AdjustStockScreen';
import AnalyticsScreen from '../navigation/AnalyticsScreen';
import OrdersScreen from '../navigation/OrdersScreen';
import SettingsScreen from '../navigation/SettingsScreen';
import TabBar from '../../components/icons/TabBar';

// Import types and data
import { User } from '../types/User';
import { Item } from '../types/Item';
import { USERS } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { mockLogs } from '../data/mockLogs';
import { mockOrders } from '../data/mockOrders';

const MobileApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<'signin' | 'signup' | 'list' | 'detail' | 'add' | 'edit' | 'adjust'>('signin');
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Create mutable copies of the mock data
  const [items, setItems] = useState<Item[]>([...mockItems]);
  const [allLogs, setAllLogs] = useState([...mockLogs]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const logs = allLogs.filter(log => log.itemId === selectedItem?.id).slice(0, 10);

  const handleSignIn = (email: string, password: string) => {
    const foundUser = USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setScreen('list');
    }
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      password
    };
    USERS.push(newUser);
    setUser(newUser);
    setScreen('list');
  };

  const handleSignOut = () => {
    setUser(null);
    setScreen('signin');
    setSelectedItem(null);
  };

  const handleAddItem = (itemData: Omit<Item, 'id' | 'lastUpdated'>) => {
    const newItem: Item = {
      ...itemData,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString()
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setScreen('list');
    setRefreshKey(prev => prev + 1);
  };

  const handleEditItem = (itemData: Omit<Item, 'id' | 'lastUpdated'>) => {
    if (!selectedItem) return;
    
    const updatedItems = items.map(item => 
      item.id === selectedItem.id 
        ? {
            ...item,
            ...itemData,
            lastUpdated: new Date().toISOString()
          }
        : item
    );
    
    setItems(updatedItems);
    setSelectedItem(updatedItems.find(item => item.id === selectedItem.id) || null);
    setScreen('detail');
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;
    
    const updatedItems = items.filter(i => i.id !== selectedItem.id);
    const updatedLogs = allLogs.filter(log => log.itemId !== selectedItem.id);
    
    setItems(updatedItems);
    setAllLogs(updatedLogs);
    setScreen('list');
    setSelectedItem(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleAdjustQuantity = (type: 'add' | 'remove', amount: number, reason: string) => {
    if (!selectedItem || !user) return;

    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        const newQuantity = type === 'add' 
          ? item.quantity + amount
          : item.quantity - amount;

        return {
          ...item,
          quantity: newQuantity,
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    });

    const newLog = {
      id: crypto.randomUUID(),
      itemId: selectedItem.id,
      type,
      amount,
      reason,
      timestamp: new Date().toISOString(),
      user: user.name
    };

    const updatedLogs = [newLog, ...allLogs];

    setItems(updatedItems);
    setAllLogs(updatedLogs);
    setSelectedItem(updatedItems.find(item => item.id === selectedItem.id) || null);
    setScreen('detail');
    setRefreshKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setItems([...items]);
    setRefreshKey(prev => prev + 1);
  };

  // Render different screens based on navigation state
  const renderMainContent = () => {
    if (screen === 'detail' && selectedItem) {
      return (
        <ItemDetailScreen
          item={selectedItem}
          logs={logs}
          onBack={() => setScreen('list')}
          onEdit={() => setScreen('edit')}
          onDelete={handleDeleteItem}
          onAdjust={() => setScreen('adjust')}
        />
      );
    }

    if (screen === 'add') {
      return (
        <AddEditItemScreen
          onBack={() => setScreen('list')}
          onSave={handleAddItem}
        />
      );
    }

    if (screen === 'edit' && selectedItem) {
      return (
        <AddEditItemScreen
          item={selectedItem}
          onBack={() => setScreen('detail')}
          onSave={handleEditItem}
        />
      );
    }

    if (screen === 'adjust' && selectedItem && user) {
      return (
        <AdjustQuantityScreen
          item={selectedItem}
          user={user}
          onBack={() => setScreen('detail')}
          onSave={handleAdjustQuantity}
        />
      );
    }

    // Tab-based screens
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsScreen items={items} onBack={() => setActiveTab('inventory')} />;
      
      case 'orders':
        return <OrdersScreen orders={mockOrders} onBack={() => setActiveTab('inventory')} />;
      
      case 'settings':
        return <SettingsScreen user={user!} onSignOut={handleSignOut} onBack={() => setActiveTab('inventory')} />;
      
      case 'inventory':
      default:
        return (
          <InventoryListScreen
            user={user!}
            items={items}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setScreen('detail');
            }}
            onAddItem={() => setScreen('add')}
            onSignOut={handleSignOut}
            onRefresh={handleRefresh}
          />
        );
    }
  };

  if (!user) {
    if (screen === 'signup') {
      return (
        <SignUpScreen
          onSignUp={handleSignUp}
          onNavigateToSignIn={() => setScreen('signin')}
        />
      );
    }
    return (
      <SignInScreen
        onSignIn={handleSignIn}
        onNavigateToSignUp={() => setScreen('signup')}
      />
    );
  }

  // Show tab bar only on main screens (not detail/edit/add screens)
  const showTabBar = ['list', 'detail', 'add', 'edit', 'adjust'].includes(screen) && activeTab === 'inventory';

  return (
    <View style={tw`flex-1 bg-white`}>
      {renderMainContent()}
      {showTabBar && (
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </View>
  );
};

export default MobileApp;