function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}