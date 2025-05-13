import React from 'react';
import { FlatList, ImageBackground, Image, TouchableOpacity, View, Alert, Animated, Modal, Pressable, SafeAreaView, } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, CircleIcon, AddIcon, TrashIcon, RemoveIcon, ChevronRightIcon,
} from "@/components/ui/icon";
import {Checkbox,CheckboxIcon,CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {Select,SelectIcon,SelectInput,SelectTrigger,SelectPortal,SelectBackdrop,SelectContent,SelectItem,
} from "../ui/select";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {Radio,RadioGroup,RadioIndicator,RadioLabel,RadioIcon,
} from "@/components/ui/radio";
import { postApiCall } from "@/components/utlis/api";
import {
  getFormFieldData,
  getFormFieldDataSelector,
  setFormFieldData,
} from "../redux/reducers/loginReducer";
import { connect } from "react-redux";
import { SvgUri } from "react-native-svg";
import { styles } from "./style";
import { transformStyles } from "../constants/Matrices";
import { loadPageConfigurations } from "../redux/reducers/reservationReducer";

class cbButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.buttonText = props.text || "Button";
    this.variant = props.variant || "solid";
    this.onPress = props.onPress;
    this.customStyles = props.customStyles || "";
  }

  render() {
    const buttonArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const variant = buttonArray?.variant || this.variant;
    const buttonText = buttonArray?.text || this.buttonText;
    const buttonStyle = this.customStyles.buttonStyle;
    const buttonTextStyle = this.customStyles.buttontextStyle;

    return (
      <Button variant={variant} onPress={() => this.onPress()} style={buttonStyle}  >
        <ButtonText style={buttonTextStyle} numberOfLines={1} ellipsizeMode="tail">{buttonText}</ButtonText>
      </Button>
    );
  }
}

class cbCheckBox extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.size = props.size || 'md';
    this.isDisabled = props.isDisabled || false;
    this.isInvalid = props.isInvalid || false;
    this.checkBoxLabel = props.Label || "";
    this.customStyles = props.customStyles || "";
  }

  render() {
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const checkBoxLabelprop = inputArray?.labeltext || this.checkBoxLabel;
    const indicatorStyle = this.customStyles.CheckboxIndicator;
    const labelStyle = this.customStyles.checkboxLabel;

    return (
      <Checkbox
        size={this.size}
        isInvalid={this.isInvalid}
        isDisabled={this.isDisabled}
        style={{ flexDirection: "row" }}
      >
        <CheckboxIndicator
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "#fff",
            backgroundColor: "#fff",
          }}
        >
          <CheckboxIcon as={CheckIcon} size="md" style={{ color: "blue" }} />
        </CheckboxIndicator>
        <CheckboxLabel style={labelStyle}>{checkBoxLabelprop}</CheckboxLabel>
      </Checkbox>
    );
  }
}

class cbRadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.alignment = props.alignment || "vertical";
    this.Label = props.Label || "";
    this.options = Array.isArray(props.options) ? props.options : [];
  }

  render() {
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const radiolabelprop = inputArray?.labelText || this.selectLabel;
    const selectItems = Array.isArray(inputArray?.options)
      ? inputArray.options
      : this.options;
    const alignmentprop = inputArray?.alignment || this.alignment;
    const Stack = alignmentprop === "vertical" ? VStack : HStack;
    return (
      <FormControl>
        <VStack space="md">
          <FormControlLabel>
            <FormControlLabelText>{radiolabelprop}</FormControlLabelText>
          </FormControlLabel>
          <RadioGroup>
            <Stack space="sm">
              {selectItems.map((item, index) => (
                <Radio key={index} value={item.value} size="md">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{item.label}</RadioLabel>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </VStack>
      </FormControl>
    );
  }
}

class cbSelect extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.placeholder = props.placeholder || "Select";
    this.isRequired = props.isRequired || false;
    this.isInvalid = props.isInvalid || false;
    this.selectLabel = props.Label || "";
    this.selectItems = Array.isArray(props.selectItems)
      ? props.selectItems
      : [];
    this.style = props.style;
    this.isTimeModalSelected = props.isTimeModalSelected;
    this.state = {
      isSelected: false,
    };
  }

  render() {
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const selectLabelprop = inputArray?.labelText || this.selectLabel;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const selectItems = Array.isArray(inputArray?.options)
      ? inputArray.options
      : this.selectItems;
    return (
      <FormControl
        isRequired={this.isRequired}
        isInvalid={this.isInvalid}
        style={this.style}
      >
        <FormControlLabel>
          <FormControlLabelText>{selectLabelprop}</FormControlLabelText>
        </FormControlLabel>
        <TouchableOpacity>
          <Select>
            <SelectTrigger>
              <SelectInput placeholder={placeholderprop} />
              <SelectIcon as={ChevronDownIcon} width={16} height={16} />
            </SelectTrigger>
            <SelectPortal isOpen={this.state.isSelected}>
              <SelectBackdrop />
              <SelectContent>
                {selectItems.map((item, index) => (
                  <SelectItem
                    key={index}
                    label={item.label}
                    value={item.value}
                    onPress={() =>
                      this.setState({ isSelected: false }, () =>
                        console.log(item.value, "=== > selectedItem")
                      )
                    }
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </TouchableOpacity>
        <FormControlError>
          <FormControlErrorText></FormControlErrorText>
        </FormControlError>
      </FormControl>
    );
  }
}

class cbInput extends React.Component {
  constructor(props) {
    super(props);
    this.formId = props.formId;
    this.id = props.id;
    this.labelText = props.labelText || "";
    this.variant = props.variant || "outline";
    this.input = props.input || "text";
    this.placeholder = props.placeholder || "";
    this.errorMessage = props.errorMessage || "";
    this.isReadOnly = props.isReadOnly || false;
    this.isDisabled = props.isDisabled || false;
    this.isRequired = props.isRequired || false;
    this.isInvalid = props.isInvalid || false;
    this.setFormFieldData =
      typeof props.setFormFieldData === "function"
        ? props.setFormFieldData
        : () => {};
    this.style = props.style;
    this.multiline = props.multiline;
    this.numberOfLines = props.numberOfLines;
    this.value = props.value;
    this.getFormFieldData =
      typeof props.getFormFieldData === "function"
        ? props.getFormFieldData
        : () => {};
    this.props = props.labelRequired;
    this.isPasswordVisible = props.isPasswordVisible;
    this.placeholderTextColor = props.placeholderTextColor;
  }

  render() {
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const variantprop = inputArray?.variant || this.valueariant;
    const typeprop = inputArray?.type || this.input;
    const labelTextprop = inputArray?.labelText || this.labelText;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const errorMessageprop = inputArray?.errorMessage || this.errorMessage;
    const isDisabledprop = inputArray?.isDisabled === 1 || this.isDisabled;
    const isReadOnlyprop = inputArray?.isReadOnly === 1 || this.isReadOnly;
    const isRequiredprop = inputArray?.isRequired === 1 || this.isRequired;
    const value = getFormFieldDataSelector(
      this.props?.formData,
      this.props?.formId,
      this.props?.id
    );
    return (
      <FormControl
        isDisabled={isDisabledprop}
        isReadOnly={isReadOnlyprop}
        isRequired={isRequiredprop}
      >
        {this.labelRequired && labelTextprop && (
          <FormControlLabel>
            <FormControlLabelText>{this?.labelText}</FormControlLabelText>
          </FormControlLabel>
        )}
        <Input variant={variantprop}>
          <InputField
            id={this.id}
            placeholder={placeholderprop}
            placeholderTextColor={this.placeholderTextColor}
            type={!this.props?.isPasswordVisible ? typeprop : "text"}
            multiline={this.multiline}
            numberOfLines={this.numberOfLines}
            style={[{ textAlignVertical: "top" }, this.style]}
            value={value?.value ? value?.value : this.value}
            onChangeText={(value) => {
              this.props?.setFormFieldData({
                formId: this.props?.formId,
                type: "input",
                id: this.id,
                controlValue: value,
                controlId: this.id,
              });
            }}
            onFocus={() =>
              this.props?.setFormFieldData({
                formId: this.props?.formId,
                type: "input",
                id: this.id,
                value,
                controlId: this.id,
              })
            }
          />
        </Input>
        {isRequiredprop && errorMessageprop && (
          <FormControlError>
            <FormControlErrorText>{errorMessageprop}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    );
  }
}

function cbForm({ formId, setFormFieldData, children }) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { formId, setFormFieldData })
      : child
  );

  return <Box style={{ width: "90%" }}>{childrenWithProps}</Box>;
}

class cbVStack extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.children = this.props;
    this.space = props.space || "md";
  }

  render() {
 
    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const spaceprop = inputArray?.space || this.space;

    return <VStack space={spaceprop}>{children}</VStack>;
  }
}

class CbFlatList extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.children = props.children;
    this.space = props.space || "md";
    this.flatlistData = props.flatlistData || [];
    this.numColumns = props.numColumns || 0;
    this.initialNumToRender = props.initialNumToRender || 10;
    this.bounces = props.bounces || false;
    this.horizontal = props.horizontal;
    this.inverted = props.inverted || false;
    this.contentContainerStyle = props.contentContainerStyle;
    this.ref = props.ref;
    this.emptyListText = props.emptyListText || "";
    this.showsHorizontalScrollIndicator =
      props.showsHorizontalScrollIndicator || false;
    this.showsVerticalScrollIndicator =
      props.showsVerticalScrollIndicator || false;
    this.customStyles = props.customStyles || {};
    this.extraData = props.extraData || [];
    this.scrollEnabled = props.scrollEnabled;
    this.nestedScrollEnabled = props.nestedScrollEnabled;
  }
  renderEmptyList = () => {
    return (
      <VStack>
        <Text>{this.emptyListText}</Text>
      </VStack>
    );
  };
  render() {
    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(
      (item) => item.id === this.id
    );
    const spaceprop = inputArray?.space || this.space;
    const ITEM_HEIGHT = 100;
    return (
      <FlatList
        ref={this.ref}
        keyExtractor={this.keyExtractor}
        data={this.flatlistData}
        renderItem={this.children}
        numColumns={this.numColumns}
        ListEmptyComponent={this.renderEmptyList}
        ListFooterComponent={this.ListFooterComponent}
        bounces={this.bounces}
        horizontal={this.horizontal}
        inverted={this.inverted}
        contentContainerStyle={this.contentContainerStyle}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={this.showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={this.showsVerticalScrollIndicator}
        style={this.customStyles}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        windowSize={21}
        onEndReachedThreshold={0.1}
        extraData={this.extraData}
        scrollEnabled={this.scrollEnabled}
        nestedScrollEnabled={this.nestedScrollEnabled}
      />
    );
  }
}

class CbSelectDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex || null,
      showDropdown: false,
    };

    this.options = props.options || [];
    this.onSelect =
      typeof props.onSelect === "function" ? props.onSelect : () => {};
    this.openDropDown =
      typeof props.openDropDown === "function" ? props.openDropDown : () => {};
    this.placeholder = props.placeholder || "Select Option";
    this.customstyle = props.customstyle || {};
    this.selectItemId = props.selectItemId;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.addMemberIndex !== this.props.addMemberIndex &&
      this.props.addMemberIndex !== this.selectItemId &&
      this.state.showDropdown
    ) {
      this.setState({ showDropdown: false });
    }
  }
  toggleDropdown = () => {
    const { showDropdown } = this.state;
    const isOpening = !showDropdown;

    this.setState({ showDropdown: isOpening });

    if (isOpening) {
      this.props.setAddMemberIndex?.(this.selectItemId);
    } else {
      this.props.setAddMemberIndex?.(null);
    }
    this?.openDropDown();
  };

  selectItem = (index) => {
    this.setState({
      selectedIndex: index,
      showDropdown: false,
    });

    this.onSelect(this.options[index]?.label || this.options[index], index);
  };

  renderDropdown = () => {
    return (
      <FlatList
        style={styles.dropdown}
        data={this.options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.dropdownItem, this.props.dropdownItemStyle]}
            onPress={() => this.selectItem(index)}
          >
            <Text style={styles.dropdownText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  render() {
    const { selectedIndex, showDropdown } = this.state;
    const selectedValue =
      selectedIndex !== null
        ? this.options[selectedIndex]?.label
        : this.placeholder;

    return (
      <View style={this.props.customstyle}>
        <TouchableOpacity
          onPress={this.toggleDropdown}
          style={[styles.selector]}
        >
          <Text style={styles.selectorText}>{selectedValue}</Text>
          <View style={{ width: 20, height: 20 }}>
            <Icon as={ChevronDownIcon} size="sm" />
          </View>
        </TouchableOpacity>

        {showDropdown && this.renderDropdown()}
      </View>
    );
  }
}

class CbErrorMessagePopup extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.visible = props.visible;
    this.errorMessage = props.errorMessage;
    this.transparent = props.transparent;
    this.onRequestClose =
      typeof props.onRequestClose === "function"
        ? props.onRequestClose
        : () => {};
  }
  render() {
    return (
      <Modal
        transparent={this.transparent}
        visible={this.visible}
        animationType="fade"
        onRequestClose={this.onRequestClose}
      >
        <Pressable style={styles.modalOverlay} onPress={this.onRequestClose} />
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTxt}>{this.errorMessage}</Text>
        </View>
      </Modal>
    );
  }
}

class CbText extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.pageID = props.pageId;
    this.styles = props.style || {};
    this.numberOfLines = props.numberOfLines || undefined;
    this.Conditionalstyle = props.Conditionalstyle || {};
    this.strikeThrough = props.strikeThrough || "false";
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };

  flattenStyle(inputStyle) {
    if (Array.isArray(inputStyle)) {
      return inputStyle.reduce((acc, style) => ({ ...acc, ...style }), {});
    }
    return inputStyle || {};
  }

  render() {
    const { ControlConfig } = this.state;
    const StrikeThrough = ControlConfig?.StrikeThrough || this.strikeThrough;
    const Styles = ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);
    const dynamicStyle =
      StyleProps && Object.keys(StyleProps).length > 0
        ? Object.values(StyleProps)[0]
        : this.styles;
    const LabelText = ControlConfig?.LabelText || this.props.children;
    const combinedStyle = {
      ...this.flattenStyle(dynamicStyle),
      ...this.flattenStyle(this.Conditionalstyle),
    };


    return (
      <Text
        strikeThrough={StrikeThrough}
        style={combinedStyle}
        numberOfLines={this.numberOfLines}
      >
        {LabelText}
      </Text>
    );
  }
}

class CbImage extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.pageID = props.pageId;
    this.source = props.source || "";
    this.imageJsx = props.imageJsx;
    this.resizeMode = props.resizeMode || "";
    this.styles = props.style || "";
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };

  render() {
    const { ControlConfig } = this.state;
    const source = ControlConfig?.ImageSource || this.source;
    const Styles = ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);
    const dynamicStyle =
      StyleProps && Object.keys(StyleProps).length > 0
        ? Object.values(StyleProps)[0]
        : this.styles;
    const jsx = this.imageJsx;
    const ResizeMode = ControlConfig?.resizeMode || this.resizeMode;
    if (source) {
      if (source.endsWith(".svg")) {
        return <SvgUri source={{ uri: source }} />;
      } else {
        return (
          <Image
            alt="image"
            resizeMode={ResizeMode}
            source={{ uri: source }}
            style={dynamicStyle}
          />
        );
      }
    } else if (React.isValidElement(jsx)) {
      return React.cloneElement(this.imageJsx, {
        style: [jsx.props.style, dynamicStyle], // Merge styles
      });
    } else {
      return null;
    }
  }
}

class CbImageBackground extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
    this.pageID = props.pageId;
    this.source = props.source || null;
    this.styles = props.style || null;
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };

  render() {
    const { ControlConfig } = this.state;
    const { children } = this.props;
    const sourceprop = ControlConfig?.source || this.source;
    const Styles = ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);
    const dynamicStyle =
      StyleProps && Object.keys(StyleProps).length > 0
        ? Object.values(StyleProps)[0]
        : this.styles;

    return (
      <ImageBackground source={sourceprop} alt="login" style={dynamicStyle}>
        {children}
      </ImageBackground>
    );
  }
}

class CbCommonButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.pageID = props.pageId;
    this.cartQuantity = props.cartQuantity;
    this.showBtnName = props.showBtnName || "";
    this.isPlusIconAvailable = props.isPlusIconAvailable || false;
    this.style = props.style;
    this.btnTextStyle = props.btnTextStyle;
    this.onPress = props.onPress;
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };
  render() {
    const { ControlConfig } = this.state;
    const Styles = ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);
    const Buttontext = ControlConfig?.Buttontext || this.showBtnName;
    const ButtonStyleProp = StyleProps?.buttonStyle || this.style;
    const ButtonTextStyle = StyleProps?.buttonTextStyle || this.btnTextStyle;
    const isPlusIconAvailable =
      ControlConfig?.isPlusIconAvailable == "true" || this.isPlusIconAvailable;
    return (
      <Box>
        <TouchableOpacity
          style={[ButtonStyleProp ? ButtonStyleProp : styles.mediumBtn]}
          onPress={() => this?.onPress()}
        >
          {isPlusIconAvailable && <Icon as={AddIcon} color="#2A4E7D" />}
          <Text
            style={[ButtonTextStyle ? ButtonTextStyle : styles.mediumBtnTxt]}
          >
            {Buttontext}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  }
}

class CbBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlConfig: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }

  async loadPageConfig() {
    try {
      const { loadPageConfigurations, pageId, id } = this.props;
      const config = await loadPageConfigurations({
        pageID: pageId,
        controlId: id,
      });
      if (config) {
        this.setState({ controlConfig: config });
      }
    } catch (error) {
    }
  }

  flattenStyle(inputStyle) {
    if (Array.isArray(inputStyle)) {
      return inputStyle.reduce((acc, style) => ({ ...acc, ...style }), {});
    }
    return inputStyle || {};
  }

  render() {
    const {
      style = {},
      Conditionalstyle = {},
      children,
    } = this.props;
    const { controlConfig } = this.state;

    const stylesFromConfig = transformStyles(controlConfig?.Styles);
    const dynamicStyle = stylesFromConfig && Object.keys(stylesFromConfig).length > 0
      ? Object.values(stylesFromConfig)[0]
      : style;

    const combinedStyle = {
      ...this.flattenStyle(dynamicStyle),
      ...this.flattenStyle(Conditionalstyle),
    };

    return (
      <Box style={combinedStyle}>
        {children}
      </Box>
    );
  }
}


class CbView extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.pageID = props.pageId;
    this.Conditionalstyle = props.Conditionalstyle || {};
    this.styles = props.style || {};
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
   console.log('combinedStyleindsideee', this.styles);
        
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };
  flattenStyle(inputStyle) {
    if (Array.isArray(inputStyle)) {
      return inputStyle.reduce((acc, style) => ({ ...acc, ...style }), {});
    }
    return inputStyle || {};
  }
  render() {
    const { ControlConfig } = this.state;
    const Styles = ControlConfig?.Styles;
    const StyleProps = transformStyles(Styles);
    const dynamicStyle =
      StyleProps && Object.keys(StyleProps).length > 0
        ? Object.values(StyleProps)[0]
        : this.styles;
        const combinedStyle = {
          ...this.flattenStyle(dynamicStyle),
          ...this.flattenStyle(this.Conditionalstyle),
        };

    return (
      <View style={combinedStyle}>
        {this.props.children}
      </View>
    );
  }
}

class CbHeader extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.pageID = props.pageId;
    this.Conditionalstyle = props.Conditionalstyle || {};
    this.styles = props.style || {};
    this.source = props.source;
    this.headerTitle = props.headerTitle;
    this.goBack = typeof props.goBack === "function" ? props.goBack : () => {};
    this.state = {
      ControlConfig: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadPageConfig();
    }, 500);
  }
  loadPageConfig = () => {
    try {
      const ControlConfig = this.props?.loadPageConfigurations({
        pageID: this.pageID,
        controlId: this.id,
      });
      this.setState({ ControlConfig });
    } catch (error) {}
  };
  render() {
    const { ControlConfig } = this.state;
    const Styles = ControlConfig?.Styles;
    const ImageSource = ControlConfig?.ImageSource || this.source;
    const StyleProps = transformStyles(Styles);
    const dynamicStyle =
      StyleProps && Object.keys(StyleProps).length > 0
        ? Object.values(StyleProps)[0]
        : this.styles;
    return (
      <SafeAreaView style={[dynamicStyle, styles.headerMainContainer]}>
        <View style={styles.headerSubContainer}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={() => this.goBack()}
            >
              {ImageSource ? (
                <Image
                  source={{ uri: ImageSource }}
                  style={Styles ? Styles?.BackIcon : styles.BackIcon}
                />
              ) : (
                <Image
                  alt="image"
                  source={require("@/assets/images/icons/Back.png")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{this.headerTitle}</Text>
          </View>
          <TouchableOpacity>
            {ImageSource ? (
              <Image
                source={{ uri: ImageSource }}
                style={Styles ? Styles?.HomeIcon : styles.HomeIcon}
              />
            ) : (
              <Image
                alt="image"
                source={require("@/assets/images/icons/Home.png")}
                style={Styles ? Styles?.HomeIcon : styles.HomeIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    formData: state.login.formData,
  }
};

const mapDispatchToProps = {
  setFormFieldData,
  getFormFieldData,
  loadPageConfigurations
};
cbButton.displayName = 'ConnectedCbButton';
cbInput.displayName = 'ConnectedCbInput';
cbCheckBox.displayName = 'ConnectedCbCheckBox';
cbSelect.displayName = 'ConnectedCbSelect';
cbRadioButton.displayName = 'ConnectedCbRadioButton';
cbVStack.displayName = 'ConnectedCbVStack';
cbForm.displayName = 'ConnectedCbForm';
CbFlatList.displayName = "ConnectedCbFlatList"
CbErrorMessagePopup.displayName = "ConnectedCbErrorMessagePopup"
CbText.displayName = "ConnectedCbText"
CbImageBackground.displayName = 'ConnectedCbImageBackground';
CbImage.displayName = 'ConnectedCbImage';
CbCommonButton.displayName = 'ConnectedCbCommonButton';
CbBox.displayName = 'ConnectedCbBox';
CbView.displayName = 'ConnectedCbView';
CbHeader.displayName = 'ConnectedCbHeader'
 

const ConnectedCbInput = connect(mapStateToProps, mapDispatchToProps)(cbInput);
const ConnectedCbButton = connect(mapStateToProps, mapDispatchToProps)(cbButton);
const ConnectedCbCheckBox = connect(mapStateToProps, mapDispatchToProps)(cbCheckBox);
const ConnectedCbSelect = connect(mapStateToProps, mapDispatchToProps)(cbSelect);
const ConnectedCbRadioButton = connect(mapStateToProps, mapDispatchToProps)(cbRadioButton);
const ConnectedCbVStack = connect(mapStateToProps, mapDispatchToProps)(cbVStack);
const ConnectedCbForm = connect(mapStateToProps, mapDispatchToProps)(cbForm);
const ConnectedCbFlatList = connect(mapStateToProps, mapDispatchToProps)(CbFlatList);
const ConnectedCbSelectDropDown = connect(mapStateToProps, mapDispatchToProps)(CbSelectDropDown);
const ConnectedCbErrorMessagePopup = connect(mapStateToProps, mapDispatchToProps)(CbErrorMessagePopup);
const ConnectedCbText = connect(mapStateToProps, mapDispatchToProps)(CbText);
const ConnectedCbImage = connect(mapStateToProps, mapDispatchToProps)(CbImage);
const ConnectedCbImageBackground = connect(mapStateToProps, mapDispatchToProps)(CbImageBackground);
const ConnectedCbCommonButton = connect(mapStateToProps, mapDispatchToProps)(CbCommonButton);
const ConnectedCbBox = connect(mapStateToProps, mapDispatchToProps)(CbBox);
const ConnectedCbView = connect(mapStateToProps, mapDispatchToProps)(CbView);
const ConnectedCbHeader = connect(mapStateToProps, mapDispatchToProps)(CbHeader);
export {
  ConnectedCbButton,
  ConnectedCbInput,
  ConnectedCbCheckBox,
  ConnectedCbSelect,
  ConnectedCbImageBackground,
  ConnectedCbRadioButton,
  ConnectedCbVStack,
  ConnectedCbForm,
  ConnectedCbFlatList,
  ConnectedCbImage,
  ConnectedCbSelectDropDown,
  ConnectedCbErrorMessagePopup,
  ConnectedCbText,
  ConnectedCbCommonButton,
  ConnectedCbBox,
  ConnectedCbView,
  ConnectedCbHeader
};

// export {  cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm, CbFlatList, CbImage };