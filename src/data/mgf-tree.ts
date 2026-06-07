import type { TreeNode } from "@/components/projects/file-tree";

const f = (name: string): TreeNode => ({ name, type: "file" });
const d = (name: string, children: TreeNode[]): TreeNode => ({ name, type: "dir", children });
const cpps = (...names: string[]): TreeNode[] => names.map((n) => f(`${n}.cpp`));
const hs = (...names: string[]): TreeNode[] => names.map((n) => f(`${n}.h`));

export const mgfTree: TreeNode = d("MirageGameFramework", [
  d("Source", [

    d("CombatSystemModule", [
      d("Private", [
        d("Actors", cpps("MGF_FirearmActorBase", "MGF_MeleeWeaponActorBase", "MGF_RangedWeaponActorBase", "MGF_WeaponActorBase")),
        d("Animation", cpps("MGF_ActionWindowNotifyState", "MGF_ComboWindowNotifyState", "MGF_ResetComboNotify", "MGF_SaveAttackNotifyState", "MGF_WeaponSocketSwitchNotify")),
        d("Components", cpps("MGF_AbilitySetupComponent", "MGF_CombatComponent", "MGF_FirearmComponent", "MGF_WeaponStateComponent")),
        d("Data", cpps("MGF_HitZoneProfileData", "MGF_RecoilProfileData", "MGF_SpreadProfileData", "MGF_WeaponPatternData")),
        d("Fragments", cpps("MGF_ItemFirearmFragment")),
        d("GAS", [
          d("Abilities", cpps("MGF_CombatAbility", "MGF_HitboxAttackAbility", "MGF_RangedAttackAbility")),
          d("Cues", cpps("MGF_HitGameplayCue")),
          d("Tasks", cpps("MGF_PlayMontageFromIDTask")),
        ]),
        d("Interfaces", cpps("MGF_WeaponAnimInterface")),
        d("Logging", cpps("MGF_CombatLog")),
        d("Settings", cpps("MGF_CombatDeveloperSettings")),
        d("Subsystems", cpps("MGF_ActionRegistrySubsystem", "MGF_WeaponPatternSubsystem")),
        d("Tags", cpps("MGF_CombatTags", "MGF_StatusTags", "MGF_WeaponTypeTags")),
        f("CombatSystemModule.cpp"),
      ]),
      d("Public", [
        d("Actors", hs("MGF_FirearmActorBase", "MGF_MeleeWeaponActorBase", "MGF_RangedWeaponActorBase", "MGF_WeaponActorBase")),
        d("Animation", hs("MGF_ActionWindowNotifyState", "MGF_ComboWindowNotifyState", "MGF_ResetComboNotify", "MGF_SaveAttackNotifyState", "MGF_WeaponSocketSwitchNotify")),
        d("Components", hs("MGF_AbilitySetupComponent", "MGF_CombatComponent", "MGF_FirearmComponent", "MGF_WeaponStateComponent")),
        d("Data", hs("MGF_ActionData", "MGF_ComboChainData", "MGF_FirearmData", "MGF_HitZoneProfileData", "MGF_RecoilProfileData", "MGF_SpreadProfileData", "MGF_WeaponInfoData", "MGF_WeaponPatternData")),
        d("Fragments", hs("MGF_ItemFirearmFragment")),
        d("GAS", [
          d("Abilities", hs("MGF_CombatAbility", "MGF_HitboxAttackAbility", "MGF_RangedAttackAbility")),
          d("Cues", hs("MGF_HitGameplayCue")),
          d("Tasks", hs("MGF_PlayMontageFromIDTask")),
        ]),
        d("Interfaces", hs("MGF_WeaponAnimInterface")),
        d("Logging", hs("MGF_CombatLog")),
        d("Settings", hs("MGF_CombatDeveloperSettings")),
        d("Subsystems", hs("MGF_ActionRegistrySubsystem", "MGF_WeaponPatternSubsystem")),
        d("Tags", hs("MGF_CombatTags", "MGF_StatusTags", "MGF_WeaponTypeTags")),
        f("CombatSystemModule.h"),
      ]),
      f("CombatSystemModule.Build.cs"),
    ]),

    d("ContainerSystemModule", [
      d("Private", [
        d("Actors", cpps("MGF_ContainerActor")),
        d("Components", cpps("MGF_ContainerComponent")),
        d("Data", cpps("MGF_ContainerDefinitionData", "MGF_ContainerItemData", "MGF_ContainerListData", "MGF_LootTableData")),
        d("Logging", cpps("MGF_ContainerLog")),
        d("Subsystems", cpps("MGF_LootGeneratorSubsystem")),
        d("Tags", cpps("MGF_ContainerTags")),
        f("ContainerSystemModule.cpp"),
      ]),
      d("Public", [
        d("Actors", hs("MGF_ContainerActor")),
        d("Components", hs("MGF_ContainerComponent")),
        d("Data", hs("MGF_ContainerDefinitionData", "MGF_ContainerItemData", "MGF_ContainerListData", "MGF_ContainerStateData", "MGF_LootPoolData", "MGF_LootTableData")),
        d("Logging", hs("MGF_ContainerLog")),
        d("Subsystems", hs("MGF_LootGeneratorSubsystem")),
        d("Tags", hs("MGF_ContainerTags")),
        f("ContainerSystemModule.h"),
      ]),
      f("ContainerSystemModule.Build.cs"),
    ]),

    d("HitboxSystemModule", [
      d("Private", [
        d("Actors", cpps("MGF_AdaptableCollisionActorBase", "MGF_BeamBase", "MGF_DamageVolumeBase", "MGF_ProjectileBase")),
        d("Animation", cpps("MGF_HitboxWindowNotifyState", "MGF_SpawnActorNotify")),
        d("Data", cpps("MGF_HitboxShape", "MGF_HitboxShapeData")),
        d("FunctionLibraries", cpps("MGF_HitboxFunctionLibrary")),
        d("GAS", [
          d("Abilities", []),
          d("Tasks", cpps("MGF_WaitHitEventTask")),
        ]),
        d("Logging", cpps("MGF_HitboxLog")),
        f("HitboxSystemModule.cpp"),
      ]),
      d("Public", [
        d("Actors", hs("MGF_AdaptableCollisionActorBase", "MGF_BeamBase", "MGF_DamageVolumeBase", "MGF_ProjectileBase")),
        d("Animation", hs("MGF_HitboxWindowNotifyState", "MGF_SpawnActorNotify")),
        d("Data", hs("MGF_HitboxDebugData", "MGF_HitboxShape", "MGF_HitboxShapeData", "MGF_HitboxTypes", "MGF_ProjectileSpawnData")),
        d("FunctionLibraries", hs("MGF_HitboxFunctionLibrary")),
        d("GAS", [
          d("Abilities", []),
          d("Tasks", hs("MGF_WaitHitEventTask")),
        ]),
        d("Logging", hs("MGF_HitboxLog")),
        f("HitboxSystemModule.h"),
      ]),
      f("HitboxSystemModule.Build.cs"),
    ]),

    d("InteractionSystemModule", [
      d("Private", [
        d("Components", cpps("MGF_InteractableComponent", "MGF_InteractionPointComponent", "MGF_InteractorComponent")),
        d("Data", cpps("MGF_InteractionCandidateListData", "MGF_InteractionDefinitionData")),
        d("Fragments", cpps("MGF_AbilityInteractionFragment", "MGF_ConditionalInteractionFragment", "MGF_CooldownInteractionFragment", "MGF_HoldInteractionFragment", "MGF_InstantInteractionFragment", "MGF_InteractionFragment", "MGF_MultiplePressInteractionFragment", "MGF_PermissionInteractionFragment")),
        d("Interfaces", cpps("MGF_InteractableInterface")),
        d("Logging", cpps("MGF_InteractionLog")),
        d("Settings", cpps("MGF_InteractionDeveloperSettings")),
        d("Subsystems", cpps("MGF_InteractionDetectionSubsystem")),
        d("Tags", cpps("MGF_InteractionTags")),
        f("InteractionSystemModule.cpp"),
      ]),
      d("Public", [
        d("Components", hs("MGF_InteractableComponent", "MGF_InteractionPointComponent", "MGF_InteractorComponent")),
        d("Data", hs("MGF_InteractionCandidateData", "MGF_InteractionCandidateListData", "MGF_InteractionDefinitionData", "MGF_InteractionProgressData", "MGF_InteractionUIHintData")),
        d("Fragments", hs("MGF_AbilityInteractionFragment", "MGF_ConditionalInteractionFragment", "MGF_CooldownInteractionFragment", "MGF_HoldInteractionFragment", "MGF_InstantInteractionFragment", "MGF_InteractionFragment", "MGF_MultiplePressInteractionFragment", "MGF_PermissionInteractionFragment")),
        d("Interfaces", hs("MGF_InteractableInterface")),
        d("Logging", hs("MGF_InteractionLog")),
        d("Settings", hs("MGF_InteractionDeveloperSettings")),
        d("Subsystems", hs("MGF_InteractionDetectionSubsystem")),
        d("Tags", hs("MGF_InteractionTags")),
        f("InteractionSystemModule.h"),
      ]),
      f("InteractionSystemModule.Build.cs"),
    ]),

    d("InventorySystemModule", [
      d("Private", [
        d("Actions", cpps("MGF_BuiltInContextMenuActions", "MGF_ContextMenuAction")),
        d("Components", cpps("MGF_EquipmentComponent", "MGF_InventoryComponent")),
        d("Data", cpps("MGF_ContextMenuData", "MGF_EquipmentEntryData", "MGF_EquipmentLayoutData", "MGF_EquipmentListData", "MGF_InventoryItemData", "MGF_InventoryListData", "MGF_ItemData", "MGF_StatModifierData")),
        d("Fragments", cpps("MGF_ItemEquipFragment", "MGF_ItemFragment", "MGF_ItemStackFragment", "MGF_ItemStatsFragment", "MGF_ItemUseFragment")),
        d("Logging", cpps("MGF_InventoryLog")),
        d("Settings", cpps("MGF_InventoryDeveloperSettings")),
        d("Subsystems", cpps("MGF_ContextMenuSubsystem", "MGF_ItemRegistrySubsystem")),
        d("Tags", cpps("MGF_EquipmentTags", "MGF_RarityTags")),
        d("UI", cpps("MGF_ContextMenuEntryWidget", "MGF_ContextMenuWidget", "MGF_EquipmentPanelWidget", "MGF_EquipmentSlotWidget", "MGF_InventoryDragDropOperation", "MGF_InventorySlotWidget", "MGF_InventoryWidget", "MGF_ItemDragProxyWidget", "MGF_SplitDialogWidget")),
        f("InventorySystemModule.cpp"),
      ]),
      d("Public", [
        d("Actions", hs("MGF_BuiltInContextMenuActions", "MGF_ContextMenuAction")),
        d("Components", hs("MGF_EquipmentComponent", "MGF_InventoryComponent")),
        d("Data", hs("MGF_ContextMenuData", "MGF_EquipmentEntryData", "MGF_EquipmentLayoutData", "MGF_EquipmentListData", "MGF_InventoryItemData", "MGF_InventoryListData", "MGF_ItemData", "MGF_StatModifierData")),
        d("Fragments", hs("MGF_ItemEquipFragment", "MGF_ItemExtraSlotFragment", "MGF_ItemFragment", "MGF_ItemStackFragment", "MGF_ItemStatsFragment", "MGF_ItemUseFragment")),
        d("Logging", hs("MGF_InventoryLog")),
        d("Settings", hs("MGF_InventoryDeveloperSettings")),
        d("Subsystems", hs("MGF_ContextMenuSubsystem", "MGF_ItemRegistrySubsystem")),
        d("Tags", hs("MGF_EquipmentTags", "MGF_RarityTags")),
        d("UI", hs("MGF_ContextMenuEntryWidget", "MGF_ContextMenuWidget", "MGF_EquipmentPanelWidget", "MGF_EquipmentSlotWidget", "MGF_InventoryDragDropOperation", "MGF_InventorySlotWidget", "MGF_InventoryWidget", "MGF_ItemDragProxyWidget", "MGF_SplitDialogWidget")),
        f("InventorySystemModule.h"),
      ]),
      f("InventorySystemModule.Build.cs"),
    ]),

    d("MirageCoreModule", [
      d("Private", [
        d("Actors", cpps("MGF_BaseCharacter", "MGF_BasePlayerState", "MGF_WorldItemActor")),
        d("Components", cpps("MGF_CombatEquipBridge")),
        d("Data", []),
        d("Fragments", cpps("MGF_ItemPickupFragment")),
        d("FunctionLibraries", cpps("MGF_CharacterQueryLibrary")),
        d("GAS", [d("Abilities", [])]),
        d("Logging", cpps("MGF_CoreLog")),
        d("Tags", cpps("MGF_CoreTags")),
        f("MirageCoreModule.cpp"),
      ]),
      d("Public", [
        d("Actors", hs("MGF_BaseCharacter", "MGF_BasePlayerState", "MGF_WorldItemActor")),
        d("Components", hs("MGF_CombatEquipBridge")),
        d("Data", []),
        d("Fragments", hs("MGF_ItemPickupFragment")),
        d("FunctionLibraries", hs("MGF_CharacterQueryLibrary")),
        d("GAS", [d("Abilities", [])]),
        d("Interfaces", []),
        d("Logging", hs("MGF_CoreLog")),
        d("Tags", hs("MGF_CoreTags")),
        f("MirageCoreModule.h"),
      ]),
      f("MirageCoreModule.Build.cs"),
    ]),

    d("MirageGameFrameworkEditor", [
      d("Private", [
        d("AssetTypeActions", cpps("MGF_ActionDataTableAssetType", "MGF_EquipmentLayoutDataAssetType", "MGF_HitZoneProfileDataAssetType", "MGF_InteractionDefinitionDataAssetType", "MGF_ItemDataAssetType", "MGF_RecoilProfileDataAssetType", "MGF_SpreadProfileDataAssetType", "MGF_WeaponPatternDataAssetType")),
        d("Factories", cpps("MGF_ActionDataTableFactory", "MGF_EquipmentLayoutDataFactory", "MGF_HitZoneProfileDataFactory", "MGF_InteractionDefinitionDataFactory", "MGF_ItemDataFactory", "MGF_RecoilProfileDataFactory", "MGF_SpreadProfileDataFactory", "MGF_WeaponPatternDataFactory")),
        f("MirageGameFrameworkEditor.cpp"),
      ]),
      d("Public", [
        d("AssetTypeActions", hs("MGF_ActionDataTableAssetType", "MGF_EquipmentLayoutDataAssetType", "MGF_HitZoneProfileDataAssetType", "MGF_InteractionDefinitionDataAssetType", "MGF_ItemDataAssetType", "MGF_RecoilProfileDataAssetType", "MGF_SpreadProfileDataAssetType", "MGF_WeaponPatternDataAssetType")),
        d("Factories", hs("MGF_ActionDataTableFactory", "MGF_EquipmentLayoutDataFactory", "MGF_HitZoneProfileDataFactory", "MGF_InteractionDefinitionDataFactory", "MGF_ItemDataFactory", "MGF_RecoilProfileDataFactory", "MGF_SpreadProfileDataFactory", "MGF_WeaponPatternDataFactory")),
        f("MirageGameFrameworkEditor.h"),
      ]),
      f("MirageGameFrameworkEditor.Build.cs"),
    ]),

  ]),
  f("MirageGameFramework.uplugin"),
]);
