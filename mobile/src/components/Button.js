import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../theme/colors';

const Button = ({ title, onPress, variant = 'primary', fullWidth = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' ? styles.secondaryButton : styles.primaryButton,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, variant === 'secondary' ? styles.secondaryText : styles.primaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: COLORS.TEXT_COLOR,
  },
  secondaryText: {
    color: COLORS.TEXT_COLOR,
  },
});

export default Button;

