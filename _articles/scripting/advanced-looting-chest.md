---
title: Продвинутый сундук с добычей из ролевой игры в машинописном тексте
author: schloerk # Your name
steamId: 76561198385531121 # Your steam ID to link to your steam profile
date: 10.07.2021 # The date of writing
---
ting
---

# Продвинутый сундук с добычей из ролевой игры в машинописном тексте

В этом руководстве вы научитесь создавать сундук направления, из которого выпадает добыча.
Сложнее всего масштабировать этот предмет, поскольку «Масштабирование» не поддерживается, и сохранять этот предмет во время поддержания. Также вы хотите заменить его открытой моделью сундука после его успешного открытия. Если ченнелинг не удался, вы также хотите сохранить сундук.
Он также должен сохранять масштаб и вращение. Кроме того, сундук, который мы используем, имеет два разных набора материалов, и, конечно же, мы также хотим поддержать «Кожу».

Итак, мы должны это реализовать. Пойдем.

В нашем примере мы используем models/props_generic/chest_treasure_02.vmdl и models\props_generic\chest_treasure_02_open.vmdl, которые имеют золотистый и коричневый материал. 0 — коричневый, 1 — золотой.
```
"DOTAAbilities"
{

    "item_treasure_chest_2"
	{
	"BaseClass"                       "item_lua"
	"Model"                           "models/props_generic/chest_treasure_02.vmdl"
        "ScriptFile"                      "item_treasure_chest_2.lua"
        "AbilityBehavior"                 "DOTA_ABILITY_BEHAVIOR_CHANNELLED"
	"AbilityTextureName"              "item_desolator"

        "ItemShareability"                 "ITEM_FULLY_SHAREABLE"
        "ItemKillable"                     "0"
        "ItemSellable"                     "0"
        "ItemPurchasable"                  "0"
        "ItemDroppable"                    "1"
        "ItemPermanent"                    "0"
        "ItemCost"                         "99999"

        "AbilityCooldown"                  "0.0" // Ability cooldown must be 0
        "AbilityChannelTime"               "2.5"
        "AbilityUnitTargetType"           "DOTA_UNIT_TARGET_HERO"
        "OnlyPlayerHeroPickup"            "1"
        "CreepHeroPickup"                 "1"
        "DisplayOverheadAlertOnReceived"  "0" // Show no item acquired overhead effect
        "ItemCastOnPickup"                "1" // Start channeling on pickup

        // Custom Values
        // -------------
        "ReplaceOnOpen"                   "models\props_generic\chest_treasure_02_open.vmdl"
        "Skin"                            "1"
	}
}
```
Вместо item_desolator вам следует использовать иконку получше :)
```
ts
// registerAbility() and BaseItem is provided by dota_ts_adapter and needs to be imported.

@registerAbility()
class item_treasure_chest_2 extends BaseItem {
  position!: Vector;
  angles!: Vector;
  kv!: Record<string, string>;
  channelingPlaceholder!: CBaseAnimating;

  Spawn() {
    if (IsServer()) {
      this.kv = this.GetAbilityKeyValues() as Record<string, string>;
      this.HandleSkinAndScale();
    }
  }

  private HandleSkinAndScale() {
    const kvSkin = this.GetSkin();
    const kvScale = this.GetScale();

    if (kvSkin == 0 && kvScale == 1) {
      return;
    }
    // Container is not created by engine at Spawn() time
    Timers.CreateTimer(0.01, () => {
      const container = this.GetContainer();

      if (container) {
        container.SetSkin(kvSkin);
        container.SetModelScale(kvScale);
      }
    });
  }

  // Since we channel this ability on pickup it isnt the same as the item icon, so we need to set it here.
  // When using a custom icon, make sure to support both formats (spellicon/icon)
  GetAbilityTextureName() {
    return GetAbilityTextureNameForAbility(this.GetName());
  }

  // OnSpellStart gets called twice for some reason, thats why we check if position and placeholder are set
  OnSpellStart() {
    if (IsClient()) {
      return;
    }

    if (!this.position) {
      this.position = this.GetContainer()!.GetOrigin();
      this.angles = this.GetContainer()!.GetAnglesAsVector();
    }

    if (!this.channelingPlaceholder) {
      this.channelingPlaceholder = this.SpawnReplacementChests(this.GetChestModel());
    }
  }

  OnChannelFinish(interrupted: boolean) {
    if (IsClient()) {
      return;
    }
    if (interrupted) {
      this.RedropChest();
      this.DeleteChest();
      return;
    }
    this.OnChestOpen();
  }

  OnChestOpen() {
    print('Opened chest');

    this.CreateLoot();
    this.SpawnReplacementChests(this.GetChestOpenModel());
    this.DeleteChest();
  }

  // spawned chests do not have a collider
  private SpawnReplacementChests(model: string): CBaseAnimating {
    const item = SpawnEntityFromTableSynchronous('prop_dynamic', {
      model: model,
      scale: this.GetScale(),
      origin: this.position,
      angles: this.angles,
      skin: this.GetSkin(),
    }) as CBaseAnimating;

    item.ResetSequence('chest_treasure_idle');

    return item as CBaseAnimating;
  }

  private RedropChest() {
    const chestReplace = CreateItem(this.GetName(), undefined, undefined);
    const item = CreateItemOnPositionSync(this.position, chestReplace);
    item.SetAngles(this.angles.x, this.angles.y, this.angles.z);
    item.SetModelScale(this.GetScale());
    item.ResetSequence('chest_treasure_idle');
  }

  private DeletePlaceholder() {
    this.channelingPlaceholder.RemoveSelf();
  }

  private DeleteChest() {
    // Removing an item also destroys the underlying entity, be careful
    this.GetCaster().RemoveItem(this);
    this.DeletePlaceholder();
  }

  private CreateLoot() {
    const caster = this.GetCaster();

    const item = CreateItem('item_desolator', caster.GetPlayerOwner(), undefined);
    const worldItem = CreateItemOnPositionSync(this.position, item);
    item?.LaunchLoot(
      false,
      124,
      RandomFloat(0.5, 1.2),
      caster.GetOrigin().__add(RandomVector(RandomInt(50, 150))),
    );
  }

  private GetChestOpenModel() {
    return this.kv['ReplaceOnOpen'];
  }

  private GetChestModel() {
    return this.kv['Model'];
  }

  private GetSkin() {
    return tonumber(this.kv['Skin']) || 0;
  }

  protected GetScale() {
    return tonumber(this.kv['Scale']) || 1;
  }
}
```
Наконец, вы захотите дать своему сундуку имя во всплывающей подсказке. Добавьте `"DOTA_Tooltip_ability_item_treasure_chest_2" "Testchest"` к вашему `addon_*.txt`.

У этого подхода есть некоторые недостатки. Вы не можете изменить диапазон получения и качество предмета.