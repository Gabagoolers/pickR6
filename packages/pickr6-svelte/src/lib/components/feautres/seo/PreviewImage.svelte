<script lang="ts">
	const version = PKG.version;
	const description = PKG.description;
</script>

<div
	style="
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 68px;
  letter-spacing: -2px;
  text-align: center;
  padding: 32px 64px;
  color: #000;
"
>
	<div style="display: flex;gap: 16px">
		<div>PickR6</div>
		<div>
			v{version}
		</div>
	</div>
	<div style="font-size: 32px;">{description}</div>
</div>
